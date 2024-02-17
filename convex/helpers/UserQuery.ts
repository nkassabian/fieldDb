import { mutation, query } from "../_generated/server";
import {
  customQuery,
  customCtx,
  customMutation,
} from "convex-helpers/server/customFunctions";

/**
 * A custom query handler.
 * This function returns `unauthorized` if the user is not logged in.
 * @param {QueryBuilder} query - The main query we want to extend.
 * @returns {function} - A handler function.
 */
export const userQuery = customQuery(
  query, // The base function we're extending
  // Here we're using a `customCtx` helper because our modification
  // only modifies the `ctx` argument to the function.
  customCtx(async (ctx) => {
    // Look up the logged in user
    const identity = await ctx.auth.getUserIdentity();
    // If the user isnt logged on or identity couldnt be
    // found, return unauthorized
    if (!identity) throw new Error("Unauthorized");
    //return the db object, identity desctructured.
    return { db: { ...ctx.db }, identity: { ...identity } };
  }),
);

export const userMutation = customMutation(
  mutation, ///The base mutation we're extending
  {
    args: {},
    input: async (ctx, {}) => {
      // Look up the logged in user
      const identity = await ctx.auth.getUserIdentity();
      // If the user isnt logged on or identity couldnt be
      // found, return unauthorized
      if (!identity) throw new Error("Unauthorized");
      //return the db object, identity desctructured, args.
      return { ctx: { ctx, ...identity }, args: {} };
    },
  },
);
