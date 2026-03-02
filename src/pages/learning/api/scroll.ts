export const prerender = false;
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 20;
  const start = page * pageSize + 1;

  const html = Array.from(
    { length: pageSize },
    (_, i) =>
      `<div class="bg-gray-100 p-4 rounded-lg">Item ${start + i}</div>`
  ).join("");

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};
