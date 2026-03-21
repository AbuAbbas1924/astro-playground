import { Elysia, t } from "elysia";
import { pub, sub } from "./redis";
import { registry } from "./registry";

// Redis channel name for a room
const channel = (room: string) => `chat:room:${room}`;

// Track which Redis channels this node is already subscribed to
// so we don't add duplicate listeners on every new connection
const subscribedChannels = new Set<string>();

// Fan Redis messages back out to local websocket clients.
sub.on("message", (incomingCh, payload) => {
  if (!incomingCh.startsWith("chat:room:")) return;

  const room = incomingCh.slice("chat:room:".length);
  registry.broadcast(room, payload);
});

export const chatPlugin = new Elysia({ prefix: "/ws" }).ws("/chat/:room", {
  // ── Validate incoming message shape ───────────────────
  body: t.Object({
    sender: t.String({ minLength: 1, maxLength: 32 }),
    text: t.String({ minLength: 1, maxLength: 2000 }),
  }),
  params: t.Object({
    room: t.String({ minLength: 1, maxLength: 64 }),
  }),

  // ── Client connects ───────────────────────────────────
  async open(ws) {
    const room = ws.data.params.room;
    const ch = channel(room);

    registry.join(room, ws);

    // Subscribe this NODE to the Redis channel only once.
    // Don't block the websocket handshake on Redis.
    if (!subscribedChannels.has(ch)) {
      subscribedChannels.add(ch);
      void sub.subscribe(ch).catch((err) => {
        console.error(`[chat] failed to subscribe to ${ch}`, err);
        subscribedChannels.delete(ch);
      });
    }
  },

  // ── Message received from a client ────────────────────
  async message(ws, { sender, text }) {
    const room = ws.data.params.room;
    const ch = channel(room);

    const payload = JSON.stringify({
      sender,
      text,
      time: Date.now(),
    });

    // Echo locally immediately, then fan out through Redis if available.
    registry.broadcast(room, payload, ws);
    void pub.publish(ch, payload).catch((err) => {
      console.error(`[chat] failed to publish to ${ch}`, err);
    });
  },

  // ── Client disconnects ────────────────────────────────
  async close(ws) {
    const room = ws.data.params.room;
    registry.leave(room, ws);
  },
});
