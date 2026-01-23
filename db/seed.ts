import { db, Todo_a1, User_a1 } from "astro:db";
import bcrypt from "bcryptjs";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Todo_a1).values([
    { title: "Learn Astro", completed: false },
    { title: "Learn Qwik", completed: false },
    { title: "Learn Alpine", completed: false },
  ]);
  console.log("Todo_a1 seeded");
  await db.insert(User_a1).values([
    {
      id: crypto.randomUUID(),
      email: "a@a.aa",
      password: await bcrypt.hash("a", 10),
    },
    {
      id: crypto.randomUUID(),
      email: "b@b.bb",
      password: await bcrypt.hash("b", 10),
    },
  ]);
  console.log("User_a1 seeded");
}
