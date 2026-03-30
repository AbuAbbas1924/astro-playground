import type { APIRoute } from "astro";

const pageSize = 10;

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const GET: APIRoute = async ({ url }) => {
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));

  const response = await fetch(
    `https://hn.algolia.com/api/v1/search?tags=front_page&page=${page - 1}&hitsPerPage=${pageSize}`
  );
  const data = await response.json();
  const hits = data.hits ?? [];
  const hasMore = page < (data.nbPages ?? page);

  const items = hits
    .map((hit: { url?: string; title?: string }) => {
      const href = escapeHtml(hit.url || "#");
      const title = escapeHtml(hit.title || "Untitled");

      return `
        <li class="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
          <a
            href="${href}"
            target="_blank"
            rel="noreferrer"
            class="block text-base font-medium text-slate-100 hover:text-sky-400"
          >
            ${title}
          </a>
        </li>
      `;
    })
    .join("");

  const loader = hasMore
    ? `
      <li
        hx-get="/hx/scroll/more?page=${page + 1}"
        hx-trigger="revealed"
        hx-swap="outerHTML"
        class="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-5 text-center text-sm text-slate-400"
      >
        Loading more stories...
      </li>
    `
    : "";

  return new Response(items + loader, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};
