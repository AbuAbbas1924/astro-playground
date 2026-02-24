import {Elysia} from "elysia";
import type { APIRoute } from 'astro';
import { db, Todo_a1 } from 'astro:db';

const app = new Elysia({prefix: '/api/elysia'})
.get('/', () => ({'hello': 'world'}))
.post('/', (body) => ({'hello': body}));


export const ALL: APIRoute = async ({ request }) => {
    // return new Response(JSON.stringify(app.routes));
    return await app.handle(request);
}