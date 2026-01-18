globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from '../../../chunks/astro/server_BKnKrizw.mjs';
import { d as db, T as Todo_a1 } from '../../../chunks/_astro_db_BRzhVoY0.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Db = createComponent(async ($$result, $$props, $$slots) => {
  const todos = await db.select().from(Todo_a1);
  return renderTemplate`${maybeRenderHead()}<pre>${JSON.stringify(todos, null, 2)}</pre>`;
}, "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/pages/todo/a1/db.astro", void 0);

const $$file = "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/pages/todo/a1/db.astro";
const $$url = "/todo/a1/db";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Db,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
