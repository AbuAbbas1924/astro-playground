// src/content.config.ts  ← ⚠️ MUST be at src/ root, NOT inside src/content/

// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s) from `astro/loaders`
import { glob, file } from "astro/loaders";

// 3. Import Zod (either way works)
import { z } from "astro/zod";
// OR: import { z } from 'astro:content';

// 4. Define your collection(s)
const blog = defineCollection({
  // loader replaces the old `type: 'content'`
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(), // coerce: accepts string "2025-01-15" → Date object
    author: z.string().default("Anonymous"),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

// For JSON/YAML data files, use the `file()` loader:
const authors = defineCollection({
  loader: file("./src/content/authors.json"),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
  }),
});

// 5. Export a single `collections` object
export const collections = { blog, projects, authors };
