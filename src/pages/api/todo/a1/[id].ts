import type { APIRoute } from "astro";
import { db, Todo_a1, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  if (!params?.id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
    });
  }
  const todo = await db.select().from(Todo_a1).where(eq(Todo_a1.id, params.id));
  return new Response(JSON.stringify(todo), { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  if (!params?.id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
    });
  }
  const body = await request.json();
  const todo = await db
    .update(Todo_a1)
    .set(body)
    .where(eq(Todo_a1.id, params.id))
    .returning();
  return new Response(JSON.stringify(todo), { status: 201 });
};

export const DELETE: APIRoute = async ({ params }) => {
  if (!params?.id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
    });
  }
  await db.delete(Todo_a1).where(eq(Todo_a1.id, params.id)).execute();
  return new Response(null, { status: 204 });
};
