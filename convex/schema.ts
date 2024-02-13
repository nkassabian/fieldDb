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
  })
    .index("by_user", ["userId"])
    .searchIndex("search_diagram_name", {
      searchField: "title",
      filterFields: ["userId"],
    }),
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
    databaseTypeId: v.id("databaseTypes"),
  }).index("by_databaseTypeId", ["databaseTypeId"]),
  rows: defineTable({
    title: v.string(),
    rowTypeId: v.id("rowTypes"),
    entityId: v.id("entities"),
    nullable: v.boolean(),
    primaryKey: v.boolean(),
    priority: v.number(),
  })
    .index("by_rowTypeId", ["rowTypeId"])
    .index("by_entityId", ["entityId"]),
});
