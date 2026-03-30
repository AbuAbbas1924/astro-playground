// src/pages/api/feed.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const totalPages = 20;

  const items = Array.from({ length: 100 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    title: `Post #${(page - 1) * 10 + i + 1}`,
  }));

  const itemsHtml = items
    .map(
      (item) => `
    <article class="p-6 bg-white rounded-xl shadow-xs border border-gray-100">
      <h2 class="text-lg font-semibold">${item.title}</h2>
    </article>`
    )
    .join("");

  const nextTrigger =
    page < totalPages
      ? `<div hx-get="/learning/api/feed?page=${page + 1}" hx-trigger="revealed" hx-swap="outerHTML"
           class="text-center py-4"><span class="text-gray-400">Loading more...</span></div>`
      : '<p class="text-center text-gray-400 py-4">End of feed</p>';

  return new Response(itemsHtml + nextTrigger, { headers: { "Content-Type": "text/html" } });
};
