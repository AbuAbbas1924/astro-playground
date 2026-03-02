export const prerender = false;
import type { APIRoute } from "astro";
import { db } from "../../db/index";
import { comments } from "../../db/schema";

const commentHtml = (c: { id: number; author: string; body: string }) => `
<li id="comment-${c.id}" class="flex justify-between items-start bg-white border border-gray-200 rounded-lg p-4">
  <div>
    <span class="font-semibold text-gray-800">${c.author}</span>
    <p class="text-gray-600 mt-1">${c.body}</p>
  </div>
  <button
    hx-delete="/learning/api/comments/${c.id}"
    hx-target="#comment-${c.id}"
    hx-swap="outerHTML"
    class="text-red-400 hover:text-red-600 text-sm ml-4 shrink-0"
  >Delete</button>
</li>`;

export const GET: APIRoute = async () => {
  const rows = db.select().from(comments).all();
  const html = rows.length
    ? rows.map(commentHtml).join("")
    : '<li class="text-gray-400 text-center py-4">No comments yet.</li>';
  return new Response(html, { headers: { "Content-Type": "text/html" } });
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const author = (form.get("author") as string)?.trim();
  const body = (form.get("body") as string)?.trim();

  if (!author || !body) {
    return new Response("Author and body are required.", { status: 400 });
  }

  const [row] = db.insert(comments).values({ author, body }).returning().all();
  return new Response(commentHtml(row), { headers: { "Content-Type": "text/html" } });
};
