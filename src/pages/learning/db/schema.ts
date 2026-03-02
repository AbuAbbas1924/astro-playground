// src/db/schema.ts
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  author: text("author").notNull(),
  body: text("body").notNull(),
});
