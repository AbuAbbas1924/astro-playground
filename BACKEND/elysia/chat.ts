import { Elysia, t } from "elysia";
import { pub, sub } from "./redis";
import { registry } from "./registry";

// Redis channel name for a room
const channel = (room: string) => `chat:room:${room}`;

// Track which Redis channels this node is already subscribed to
// so we don't add duplicate listeners on every new connection
const subscribedChannels = new Set<string>();

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

    // Subscribe this NODE to the Redis channel only once
    if (!subscribedChannels.has(ch)) {
      subscribedChannels.add(ch);
      await sub.subscribe(ch);

      sub.on("message", (incomingCh, payload) => {
        if (incomingCh === ch) {
          // Deliver to all local clients in this room
          registry.broadcast(room, payload);
        }
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

    // Publish to Redis — all nodes (including this one) receive it
    // and broadcast to their local clients via the sub.on('message') handler
    await pub.publish(ch, payload);
  },

  // ── Client disconnects ────────────────────────────────
  async close(ws) {
    const room = ws.data.params.room;
    registry.leave(room, ws);
  },
});
