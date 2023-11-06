import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

//TODO: Add checks
export const create = mutation({
  args: {
    diagramId: v.string(),
    enittyId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("rows", {
      title: "New Row",
      entityId: args.enittyId as Id<"entities">,
      rowTypeId: "4c7p7hj0s7x2t1f8y8z3paa89k8q36r" as Id<"rowTypes">,
      nullable: false,
      primaryKey: false,
      priority: 0,
    });

    return document;
  },
});

export const changeRowName = mutation({
  args: { rowId: v.id("rows"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingDocument = await ctx.db.get(args.rowId);

    const document = await ctx.db.patch(args.rowId, {
      title: args.title,
    });

    return document;
  },
});

export const deleteRow = mutation({
  args: { rowId: v.id("rows") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingDocument = await ctx.db.get(args.rowId);

    const document = await ctx.db.delete(args.rowId);

    return document;
  },
});

export const changeRowType = mutation({
  args: { rowId: v.id("rows"), typeId: v.id("rowTypes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingDocument = await ctx.db.get(args.rowId);

    const document = await ctx.db.patch(args.rowId, {
      rowTypeId: args.typeId,
    });

    return document;
  },
});
