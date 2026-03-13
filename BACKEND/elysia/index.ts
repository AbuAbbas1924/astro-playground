import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
// import { OK } from "astro:schema";

const PORT = 3000;

new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    })
  )
  .get("/health", () => ({
    ok: true,
    node: process.env.NODE_ID ?? "unknown",
    time: new Date().toISOString(),
  }))
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  // .get("/", () => ({ hello: "world" }))
  // .post("/", (body) => ({ hello: body }))
  .listen(PORT);
