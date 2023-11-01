import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Position, XYPosition } from "reactflow";

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
