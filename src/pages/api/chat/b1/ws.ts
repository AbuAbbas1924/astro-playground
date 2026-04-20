import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  if (request.headers.get('Upgrade') !== 'websocket') {
    return new Response('Expected WebSocket upgrade', { status: 426 });
  }

  const id = (env as Env).CHAT_B1_ROOM.idFromName('global');
  const room = (env as Env).CHAT_B1_ROOM.get(id);

  return room.fetch(request);
};
