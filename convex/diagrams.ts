import { GenericId, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { useConvex } from "convex/react";
import { GenericDatabaseReader } from "convex/server";
import { getOneFrom } from "convex-helpers/server/relationships";

export const getDiagrams = query({
  args: {
    searchQ: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;

    let dashboard;
    if (args.searchQ != null || args.searchQ != undefined) {
      dashboard = await ctx.db
        .query("diagrams")
        .withSearchIndex("search_diagram_name", (q) =>
          q.search("title", args.searchQ).eq("userId", userId),
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .collect();
    } else {
      dashboard = await ctx.db
        .query("diagrams")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("isArchived"), false))
        .collect();
    }

    return dashboard;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    databaseTypeId: v.id("databaseTypes"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("diagrams", {
      title: args.title,
      description: args.description,
      userId,
      isArchived: false,
      isPublished: false,
      databaseTypeId: args.databaseTypeId,
    });

    return document;
  },
});

export const getByIdInfo = query({
  args: {
    diagramId: v.optional(v.id("diagrams")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!args.diagramId) {
      return; // No diagramId provided
    }

    const document = await ctx.db.get(args.diagramId);

    if (!document) {
      throw new Error("Document not found or unauthorized access");
    }

    if (!identity || document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    let databaseLang = null;
    if (document.databaseTypeId) {
      const databaseType = await ctx.db.get(document.databaseTypeId);
      if (databaseType) {
        databaseLang = databaseType.title;
      }
    }

    return { ...document, lang: { databaseLang } }; // Return the document information
  },
});

export const getById = query({
  args: {
    diagramId: v.id("diagrams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.diagramId);

    if (!document) {
      throw new Error("Not found");
    }

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    var entities = await getManyFrom(
      ctx.db,
      "entities",
      "diagramId",
      document._id,
    );

    var rowTypes = await getManyFrom(
      ctx.db,
      "rowTypes",
      "databaseTypeId",
      document.databaseTypeId,
    );

    const transformedRelationships = await Promise.all(
      entities.map(async (entity: Doc<"entities">) => {
        var rows = await getManyFrom(ctx.db, "rows", "entityId", entity._id);
        return { ...entity, rows: rows };
      }),
    );

    const transformedRelationships2 = rowTypes.map(
      (rowType: Doc<"rowTypes">) => ({ ...rowType }),
    );

    const result = {
      ...document,
      entities: transformedRelationships,
      rowTypes: transformedRelationships2,
    };

    return result;
  },
});

async function getManyFrom(db: any, table: string, field: string, value: any) {
  return db
    .query(table)
    .withIndex("by_" + field, (q: any) => q.eq(field, value))
    .collect();
}
