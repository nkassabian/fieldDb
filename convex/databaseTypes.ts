import { query } from "./_generated/server";

export const getDatabaseTypes = query({
  args: {},
  handler: async (ctx) => {
    const databaseTypes = await ctx.db.query("databaseTypes").collect();

    return databaseTypes;
  },
});
