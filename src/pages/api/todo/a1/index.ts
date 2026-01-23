import { db, Todo_a1 } from "astro:db";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const todos = await db.select().from(Todo_a1);
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    // const { ...body } = await request.json();
    console.log("body", body);
    if (!body.title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
      });
    }
    const todo = await db.insert(Todo_a1).values(body).returning();
    return new Response(JSON.stringify(todo), { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};
