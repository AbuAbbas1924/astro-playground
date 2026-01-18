globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, l as renderHead, n as renderSlot, o as renderComponent } from '../chunks/astro/server_BKnKrizw.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$TodoList = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div x-data="{
    todos: [],
    async getTodos() {
      const res = await fetch('/api/todo/a1');
      this.todos = await res.json();
    }
  }" x-init="getTodos()" @recall-api.window="getTodos()"> <template x-for="todo in todos" :key="todo.id"> <div x-data="{
        completed: todo.completed,
        editMode: false,
        async updateTodo(updatedTodo) {
          await fetch('/api/todo/a1/' + updatedTodo.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
          });
        }
      }"> <div x-show="!editMode" class="flex gap-4 items-center mt-4" @dblclick.stop="editMode = true"> <input type="checkbox" x-model="completed"> <p class="w-52" x-text="todo.title" :class="{ 'line-through': completed }"></p>
|
<p x-text="todo.priority" :class="{ 'line-through': completed }"></p> <p class="text-red-500 cursor-pointer" @click="fetch('/api/todo/a1/' + todo.id, { method: 'DELETE' }).then(() => { $dispatch('recall-api') })">
&times;
</p> </div> <div x-show="editMode" @keydown.enter="updateTodo(todo); editMode = false; $dispatch('recall-api')"> <input type="text" x-model="todo.title" class="border border-violet-400">
|
<input type="text" x-model="todo.priority" class="border border-violet-400"> </div> </div> </template> </div>`;
}, "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/components/todo_a1/TodoList.astro", void 0);

const $$AddTodo = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto w-fit" x-data="{
    title: '',
    priority: 0,
    async addTodo() {
      await fetch('/api/todo/a1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.title,
          priority: this.priority,
        }),
      });
      this.title = '';
      this.priority = 0;
    }
  }"> <input type="text" x-model="title" placeholder="Title" class="border border-violet-400"> <input type="number" x-model="priority" class="border border-violet-400"> <button class="bg-orange-400 text-white px-4 py-2 rounded" @click="addTodo(); $dispatch('recall-api')">
Add
</button> </div>`;
}, "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/components/todo_a1/AddTodo.astro", void 0);

const $$Astro$1 = createAstro();
const $$Home = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> <div class="m-auto mt-10"> <div class="border-red-400 border-2 p-4"> ${renderSlot($$result, $$slots["default"])} </div> </div> </body></html>`;
}, "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/layouts/Home.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Home", $$Home, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center gap-8 mt-8"> <h1 class="text-4xl font-bold text-violet-600">Astro Todo A1</h1> ${renderComponent($$result2, "AddTodo", $$AddTodo, {})} ${renderComponent($$result2, "TodoList", $$TodoList, {})} </div> ` })}`;
}, "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/pages/index.astro", void 0);

const $$file = "D:/OneDrive/Documents/DevSrc/Astro/PLAYGROUND/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
