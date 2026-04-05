import { WebSocketServer } from 'ws';

const WS_PATH = '/api/chat/a1/ws';

function attachWss(httpServer) {
  const clients = new Set();
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (req, socket, head) => {
    if (req.url === WS_PATH) {
      wss.handleUpgrade(req, socket, head, (ws) => {
        clients.add(ws);
        console.log(`[WS] ✅ Client connected. Total: ${clients.size}`);

        ws.on('message', (data) => {
          const text = data.toString();
          for (const client of clients) {
            if (client.readyState === 1) client.send(text);
          }
        });

        ws.on('close', () => {
          clients.delete(ws);
          console.log(`[WS] Client disconnected. Total: ${clients.size}`);
        });

        ws.on('error', () => clients.delete(ws));
      });
    }
  });
}

/** @returns {import('astro').AstroIntegration} */
export default function chatWsIntegration() {
  return {
    name: 'chat-ws',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [{
              name: 'chat-ws-vite',
              configureServer(server) {
                if (server.httpServer) attachWss(server.httpServer);
              },
            }],
          },
        });
      },
    },
  };
}
