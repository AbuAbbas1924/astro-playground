// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/pages/learning/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./d1.db", // local SQLite file
  },
} satisfies Config;
