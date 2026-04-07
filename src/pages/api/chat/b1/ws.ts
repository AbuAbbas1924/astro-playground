// src/pages/api/ws.ts
import type { APIRoute } from 'astro';

const clients = new Set<WebSocket>();

export const GET: APIRoute = ({ request }) => {
    if (request.headers.get("upgrade") !== "websocket") {
        return new Response("Expected WebSocket", { status: 400 });
    }

    const { socket, response } = Bun.upgradeWebSocket(request);

    socket.onopen = () => clients.add(socket);

    socket.onmessage = (e) => {
        for (const c of clients) {
            if (c.readyState === WebSocket.OPEN) {
                c.send(e.data);
            }
        }
    };

    socket.onclose = () => clients.delete(socket);

    return response;
};