import { db, Todo_a1 } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Todo_a1).values([
    { title: "Learn Astro", completed: false },
    { title: "Learn Qwik", completed: false },
    { title: "Learn Alpine", completed: false },
  ]);
  console.log("Todo seeded");
}
