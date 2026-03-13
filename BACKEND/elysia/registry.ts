interface LiveSocket {
  send(data: string): void;
}

const rooms = new Map<string, Set<LiveSocket>>();

// Minimal shape we need from the ws object

export const registry = {
  join(room: string, ws: LiveSocket) {
    if (!rooms.has(room)) rooms.set(room, new Set());
    rooms.get(room)!.add(ws);
    console.log(`[registry] joined room="${room}" total=${rooms.get(room)!.size}`);
  },

  leave(room: string, ws: LiveSocket) {
    rooms.get(room)?.delete(ws);
    if (rooms.get(room)?.size === 0) rooms.delete(room);
    console.log(`[registry] left room="${room}"`);
  },

  broadcast(room: string, payload: string, exclude?: LiveSocket) {
    rooms.get(room)?.forEach((ws) => {
      if (ws !== exclude) ws.send(payload);
    });
  },

  size(room: string) {
    return rooms.get(room)?.size ?? 0;
  },
};

// export const registry = {
//     join(room: string, ws: LiveSocket) {
//         if (!rooms.has(room)) {
//             rooms.set(room, new Set())
//         }
//         rooms.get(room)?.add(ws)
//     },
//     leave(room: string, ws: LiveSocket) {
//         if (!rooms.has(room)) {
//             return
//         }
//         rooms.get(room)?.delete(ws)
//     }
// }
