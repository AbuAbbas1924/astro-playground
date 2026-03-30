import { Elysia } from "elysia";
import type { APIRoute } from 'astro';
export const prerender = false;

// const app = new Elysia({prefix: '/api/elysia/test'})
// .get('/', () => ({'external': 'request'}))
// .post('/', (body) => ({'hello': body}));


// export const ALL: APIRoute = async ({ request }) => {
//     // return new Response(JSON.stringify(app.routes));
//     return await app.handle(request);
// }

export const ALL: APIRoute = async ({ request }) => {
    // return new Response(JSON.stringify({'hello': 'world'}));
    return await (new Elysia({ prefix: '/api/elysia/test' })
        .get('/', () => ({ 'internal': 'request' }))
        .post('/', (body) => ({ 'hello': body })))
        .handle(request);
}