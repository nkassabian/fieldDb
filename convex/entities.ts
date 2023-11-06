import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const add = mutation({
  args: {
    title: v.string(),
    diagramId: v.id("diagrams"),
    position: v.object({ x: v.number(), y: v.number() }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    var newNode = {
      title: args.title,
      diagramId: args.diagramId,
      xPos: args.position.x,
      yPos: args.position.y,
    };
    const document = await ctx.db.insert("entities", newNode);
    return document;
  },
});

//TODO: Add parent check
export const updateTitle = mutation({
  args: { entityId: v.id("entities"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingDocument = await ctx.db.get(args.entityId);

    const document = await ctx.db.patch(args.entityId, {
      title: args.title,
    });

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("entities") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    const existingDoc = await ctx.db.get(args.id);

    if (!existingDoc) {
      throw new Error("Not found");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const updatePosition = mutation({
  args: { id: v.id("entities"), xPos: v.number(), yPos: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    const existingDoc = await ctx.db.get(args.id);

    if (!existingDoc) {
      throw new Error("Not found");
    }

    const document = await ctx.db.patch(args.id, {
      xPos: args.xPos,
      yPos: args.yPos,
    });

    return document;
  },
});

export const getRowsById = query({
  args: {
    entityId: v.optional(v.id("entities")),
  },
  handler: async (ctx, args) => {
    if (args.entityId == undefined) {
      throw new Error("missing field");
    }

    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.entityId);

    if (!document) {
      throw new Error("Not found");
    }

    if (!identity) {
      throw new Error("Unauthorized");
    }

    var rows = await getManyFrom(ctx.db, "entities", "diagramId", document._id);

    const rowsRelationsghip = rows.map((rowType: Doc<"rows">) => ({
      ...rows,
    }));

    const result = {
      ...document,
      rows: rowsRelationsghip,
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
