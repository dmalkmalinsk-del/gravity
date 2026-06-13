import { pgTable, serial, boolean, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const releaseTable = pgTable("release", {
  id: serial("id").primaryKey(),
  updated: boolean("updated").notNull().default(false),
  fileName: text("file_name"),
  version: text("version"),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertReleaseSchema = createInsertSchema(releaseTable).omit({ id: true, updatedAt: true });
export type InsertRelease = z.infer<typeof insertReleaseSchema>;
export type Release = typeof releaseTable.$inferSelect;
