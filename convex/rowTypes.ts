import { useQuery } from "convex/react";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDataTypes = query({
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

    const dataTypes = await ctx.db
      .query("rowTypes")
      .filter((q) => q.eq(q.field("databaseTypeId"), document.databaseTypeId))
      .collect();

    return dataTypes;
  },
});
