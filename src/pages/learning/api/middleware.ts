// src/middleware.ts
import { defineMiddleware, sequence } from "astro:middleware";

const logging = defineMiddleware(async (context, next) => {
  console.log(`→ ${context.request.method} ${context.url.pathname}`);
  const response = await next();
  console.log(`← ${response.status}`);
  return response;
});

const auth = defineMiddleware(async ({ request, locals, redirect }, next) => {
  const url = new URL(request.url);
  const session = request.headers.get("cookie")?.includes("session=");
  if (session) locals.user = { name: "Abbas" };
  if (url.pathname.startsWith("/admin") && !locals.user) return redirect("/login", 302);
  return next();
});

export const onRequest = sequence(logging, auth);
