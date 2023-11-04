import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  diagrams: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
    databaseTypeId: v.id("databaseTypes"),
  }).index("by_user", ["userId"]),
  entities: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    diagramId: v.id("diagrams"),
    xPos: v.number(),
    yPos: v.number(),
  }).index("by_diagramId", ["diagramId"]),
  databaseTypes: defineTable({
    title: v.string(),
  }),
  rowTypes: defineTable({
    title: v.string(),
    databaseId: v.id("databaseTypes"),
  }).index("by_databaseTypesId", ["databaseId"]),
  rows: defineTable({
    title: v.string(),
    rowTypeId: v.id("rowTypes"),
  }).index("by_rowTypeId", ["rowTypeId"]),
});
