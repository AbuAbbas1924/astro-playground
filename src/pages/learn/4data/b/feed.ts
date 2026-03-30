export async function GET({ url }: any) {
    const page = Number(url.searchParams.get("page")) || 1;
    const itemsPerPage = 5;
    const startIndex = page * itemsPerPage + 1;

    // Generate 5 more items
    const items = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: startIndex + i,
  }));

    let html = items.map((item) => `<div class="bg-gray-100 p-4 rounded-lg">Item ${item.id}</div>`).join("");

    // Add next loading trigger if there are more items
    if (page < 2) {
        html += `<div
      hx-get="/learning/api/feed?page=${page + 1}"
      hx-trigger="revealed"
      hx-swap="outerHTML"
      class="py-4 text-gray-500 text-center"
    >
      Loading more...
    </div>`;
    }

    return new Response(html, {
        headers: { "Content-Type": "text/html" },
    });
}
