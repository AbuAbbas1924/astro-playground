import { DurableObject } from 'cloudflare:workers';

export class ChatC1Room extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    const upgrade = request.headers.get('Upgrade');
    if (upgrade !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }
    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(_ws: WebSocket, message: string | ArrayBuffer) {
    for (const client of this.ctx.getWebSockets()) {
      try { client.send(message as string); } catch {}
    }
  }

  webSocketClose(_ws: WebSocket) {}
  webSocketError(_ws: WebSocket) {}
}

export default {
  fetch: () => new Response('chat-c1-room worker', { status: 200 }),
};
