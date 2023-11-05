import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { useConvex } from "convex/react";

interface DiagramWithData extends Doc<"diagrams"> {
  entities: Doc<"entities">[] | undefined;
}

export const getDiagrams = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;

    const dashboard = await ctx.db
      .query("diagrams")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    return dashboard;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
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
      databaseTypeId: "4558fq0z3dfdm98zneg6tyf99k8vp0g" as Id<"databaseTypes">,
    });

    return document;
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
      document._id
    );

    var rowTypes = await getManyFrom(
      ctx.db,
      "rowTypes",
      "databaseTypeId",
      document.databaseTypeId
    );

    const transformedRelationships = await Promise.all(
      entities.map(async (entity: Doc<"entities">) => {
        var rows = await getManyFrom(ctx.db, "rows", "entityId", entity._id);
        return { ...entity, rows: rows };
      })
    );

    const transformedRelationships2 = rowTypes.map(
      (rowType: Doc<"rowTypes">) => ({ ...rowType })
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
