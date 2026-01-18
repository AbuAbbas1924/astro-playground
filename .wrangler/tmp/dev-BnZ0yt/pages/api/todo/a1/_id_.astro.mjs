globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as db, T as Todo_a1, e as eq } from '../../../../chunks/_astro_db_BRzhVoY0.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    if (!params?.id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), {
        status: 400
      });
    }
    const todo = await db.select().from(Todo_a1).where(eq(Todo_a1.id, Number(params.id)));
    return new Response(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};
const PUT = async ({ params, request }) => {
  try {
    if (!params?.id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), {
        status: 400
      });
    }
    const body = await request.json();
    const { title, completed, priority } = body;
    const todo = await db.update(Todo_a1).set({ title, completed, priority }).where(eq(Todo_a1.id, Number(params.id))).returning();
    return new Response(JSON.stringify(todo), { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};
const DELETE = async ({ params }) => {
  try {
    if (!params?.id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), {
        status: 400
      });
    }
    await db.delete(Todo_a1).where(eq(Todo_a1.id, Number(params.id))).execute();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed", details: String(error) }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
