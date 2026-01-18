import { db, Todo_a1, User_a1 } from "astro:db";

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
      id: "1d88229d4411cc4b44e68f2baa760a41e1c2ef02149c2c4a54f82c8f544138f2",
      email: "a@a.aa",
      password: "a",
    },
    {
      id: "80273a3130561c0501e3c7334dbbd740cced08bde09006f5f621acd407291bff",
      email: "b@b.bb",
      password: "b",
    },
  ]);
  console.log("User_a1 seeded");
}
