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
