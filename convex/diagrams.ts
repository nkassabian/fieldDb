import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    });

    return document;
  },
});
