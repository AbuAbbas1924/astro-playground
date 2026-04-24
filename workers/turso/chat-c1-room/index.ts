import { DurableObject } from 'cloudflare:workers';
import { createClient, type Client } from '@libsql/client/http';

interface WorkerEnv {
  TURSO_URL: string;
  TURSO_TOKEN: string;
}

const TABLE = 'messages_c1';

export class ChatC1Room extends DurableObject<WorkerEnv> {
  private db: Client;

  constructor(ctx: DurableObjectState, env: WorkerEnv) {
    super(ctx, env);
    this.db = createClient({ url: env.TURSO_URL, authToken: env.TURSO_TOKEN });
    ctx.blockConcurrencyWhile(async () => {
      await this.db.execute(
        `CREATE TABLE IF NOT EXISTS ${TABLE} (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, ts INTEGER NOT NULL)`
      );
    });
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server);

    const { rows } = await this.db.execute(
      `SELECT text FROM ${TABLE} ORDER BY ts ASC LIMIT 50`
    );
    for (const row of rows) server.send(row.text as string);

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(_ws: WebSocket, message: string | ArrayBuffer) {
    const text = typeof message === 'string' ? message : new TextDecoder().decode(message);
    await this.db.execute({
      sql: `INSERT INTO ${TABLE} (text, ts) VALUES (?, ?)`,
      args: [text, Date.now()],
    });
    for (const c of this.ctx.getWebSockets()) {
      try { c.send(text); } catch {}
    }
  }

  webSocketClose(_ws: WebSocket) {}
  webSocketError(_ws: WebSocket) {}
}

export default {
  fetch: () => new Response('chat-c1-room-turso', { status: 200 }),
};
