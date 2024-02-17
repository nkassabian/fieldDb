import { GenericId, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { useConvex } from "convex/react";
import { GenericDatabaseReader } from "convex/server";
import { getOneFrom } from "convex-helpers/server/relationships";
import { userMutation, userQuery } from "./helpers/UserQuery";

export const getDiagrams = userQuery({
  args: {
    searchQ: v.optional(v.string()),
    languageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { db, identity } = ctx;

    let dashboard;
    if (args.searchQ != null || args.searchQ != undefined) {
      dashboard = await db
        .query("diagrams")
        .withSearchIndex("search_diagram_name", (q) =>
          q
            .search("title", args.searchQ ? args.searchQ : "")
            .eq("userId", identity.subject),
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .filter(
          (q) =>
            args.languageId === null ||
            args.languageId === undefined ||
            q.eq(q.field("databaseTypeId"), args.languageId),
        )
        .collect();
    } else {
      dashboard = await db
        .query("diagrams")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("isArchived"), false))
        .filter(
          (q: any) =>
            args.languageId === null ||
            args.languageId === undefined ||
            q.eq(q.field("databaseTypeId"), args.languageId),
        )
        .collect();
    }

    return dashboard;
  },
});

export const create = userMutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    databaseTypeId: v.id("databaseTypes"),
  },
  handler: async (ctx, args) => {
    const { db, subject } = ctx;

    const userId = subject;

    const document = await db.insert("diagrams", {
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

export const getByIdInfo = userQuery({
  args: {
    diagramId: v.optional(v.id("diagrams")),
  },
  handler: async (ctx, args) => {
    const { db, identity } = ctx;
    if (!args.diagramId) {
      return; // No diagramId provided
    }

    const document = await db.get(args.diagramId);

    if (!document) {
      throw new Error("Document not found or unauthorized access");
    }

    if (document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    let databaseLang = null;
    if (document.databaseTypeId) {
      const databaseType = await db.get(document.databaseTypeId);
      if (databaseType) {
        databaseLang = databaseType.title;
      }
    }

    return { ...document, lang: { databaseLang } }; // Return the document information
  },
});

//TODO: Change query to custom user query
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
