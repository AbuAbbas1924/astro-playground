import { db, User_a1, eq } from "astro:db";
import bcrypt from "bcryptjs";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "invalid credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user_check = await db.select().from(User_a1).where(eq(User_a1.email, email)).limit(1).get();
    if (!user_check) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const password_check = await bcrypt.compare(password, user_check.password);
    if (!password_check) {
      return new Response(JSON.stringify({ error: "invalid credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const sessionID = `${Date.now()}_${user_check.email}_${user_check.id}`;
    const sessionCookie = `session=${sessionID}; HttpOnly; Path=/; Max-Age=60; SameSite=Strict`;
    const responseHeader = new Headers({
      "Content-Type": "application/json",
      "Set-Cookie": sessionCookie,
    });
    return new Response(
      JSON.stringify({ message: "login successful", user: { id: user_check.id, email: user_check.email } }),
      {
        status: 200,
        headers: responseHeader,
      }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
