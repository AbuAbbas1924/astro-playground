import { defineDb, defineTable, column, NOW } from "astro:db";

export default defineDb({
  tables: {
    Todo_a1: defineTable({
      columns: {
        id: column.number({
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        }),
        title: column.text(),
        completed: column.boolean({ default: false }),
        priority: column.number({ default: 0 }),
        created_at: column.date({ default: NOW }),
        updated_at: column.date({ default: NOW, onUpdate: NOW }),
      },
    }),
  },
});
