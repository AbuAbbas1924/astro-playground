import type { APIRoute } from "astro";

// WebSocket upgrades for this route are handled by the Vite plugin in astro.config.mjs
export const GET: APIRoute = () => {
    return new Response("Expected WebSocket upgrade", { status: 426 });
};
