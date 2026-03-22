export const prerender = false;
import type { APIRoute } from "astro";
import { db } from "../../../../db/index";
import { comments } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ params }) => {
  const id = parseInt(params.id ?? "", 10);
  if (isNaN(id)) return new Response("Invalid id", { status: 400 });

  db.delete(comments).where(eq(comments.id, id)).run();
  return new Response("", { status: 200 });
};
