import { db, Todo_a1 } from "astro:db";
import { eq } from "astro:db";

import type { APIRoute } from "astro";

const getId = (url: URL) => {
  const id = url.searchParams.get("id");
  return id ? Number(id) : null;
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const id = getId(url);

    if (id) {
      const todo = await db.select().from(Todo_a1).where(eq(Todo_a1.id, id));
      return new Response(JSON.stringify(todo), { status: 200 });
    }

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

export const PUT: APIRoute = async ({ url, request }) => {
  try {
    const id = getId(url);

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), {
        status: 400,
      });
    }

    const body = await request.json();
    const { title, completed, priority } = body;

    const todo = await db
      .update(Todo_a1)
      .set({ title, completed, priority })
      .where(eq(Todo_a1.id, id))
      .returning();

    return new Response(JSON.stringify(todo), { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  try {
    const id = getId(url);

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), {
        status: 400,
      });
    }

    await db.delete(Todo_a1).where(eq(Todo_a1.id, id)).execute();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};
