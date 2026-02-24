import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals, cookies }, next) => {
  const userId = cookies.get("session_user_id")?.value;
  locals.userId = userId || null;
  return next();
});
