import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  return new Response(JSON.stringify({ message: "Hello!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(JSON.stringify({ success: true }), { status: 201 });
};
