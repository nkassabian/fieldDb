import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  diagrams: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
  }).index("by_user", ["userId"]),
});
