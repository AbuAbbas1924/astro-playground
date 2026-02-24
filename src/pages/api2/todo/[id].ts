import { db, Todo_a1, eq } from 'astro:db';
import type { APIRoute } from 'astro';
export const prerender = false;
// export const getStaticPaths = () => {
//     return db.select().from(Todo_a1).then((todos) => todos.map((todo) => ({ params: { id: todo.id.toString() } })));
// }
// export const GET: APIRoute = async ({ request, params }) => {
//     // const [todo] = await db.select().from(Todo_a1).where(eq(Todo_a1.id, Number(params.id)));
//     const id = params.id ? parseInt(params.id, 10) : NaN;
//     const [todo] = await db.select().from(Todo_a1).where(eq(Todo_a1.id, id));
//     console.log("todo ", todo);
//     if (!todo) {
//         return new Response('Todo not found', { status: 404 });
//     }
//     return new Response(JSON.stringify(todo), { status: 200, headers: { 'Content-Type': 'application/json' } });
// }

export const GET: APIRoute = async ({ params }) => {
    if (!params?.id) {
        return new Response(JSON.stringify({ error: 'Missing id parameter' }), { status: 400 });
    }
    // const id = parseInt(params.id, 10);
    const id = parseInt(params.id)?? 0;
    const [todo] = await db.select().from(Todo_a1).where(eq(Todo_a1.id, id));
    return new Response(JSON.stringify(todo));
} 