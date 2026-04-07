import { db, User_a1, eq } from "astro:db";
import type { APIRoute } from "astro";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 },
      );
    }
    const existingUser = await db
      .select()
      .from(User_a1)
      .where(eq(User_a1.email, email))
      .get();
    console.log("existingUser", existingUser);
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists." }), {
        status: 409,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
    };
    console.log("newUser", newUser);
    await db.insert(User_a1).values({
      id: newUser.id,
      email: newUser.email,
      password: hashedPassword,
    });
    return new Response(
      JSON.stringify({
        message: "User registered successfully.",
        user: newUser,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
