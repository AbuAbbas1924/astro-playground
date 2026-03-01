// src/pages/api/search.ts — returns HTML fragments
export const prerender = false;
import type { APIRoute } from "astro";

const posts = [
  { title: "Getting Started with Astro", slug: "astro-start" },
  { title: "Alpine.js Guide", slug: "alpine-guide" },
  { title: "TailwindCSS v4 Tips", slug: "tailwind-tips" },
  { title: "HTMX Deep Dive", slug: "htmx-deep-dive" },
];

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase() || "";

  if (!query) return new Response("", { headers: { "Content-Type": "text/html" } });

  const results = posts.filter((p) => p.title.toLowerCase().includes(query));

  const html = results.length
    ? results
        .map(
          (p) => `
        <a href="/blog/${p.slug}" class="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-xs transition-all">
          <h3 class="font-medium text-gray-900">${p.title}</h3>
        </a>`
        )
        .join("")
    : '<p class="text-gray-500 text-center py-4">No results found.</p>';

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};
