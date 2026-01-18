globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as db, T as Todo_a1 } from '../../../chunks/_astro_db_BRzhVoY0.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
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
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
