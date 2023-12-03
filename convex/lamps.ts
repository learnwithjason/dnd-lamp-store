import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { internal } from './_generated/api';

export const get = query({
  args: {},
  handler: async (context) => {
    return await context.db.query('lamps').collect();
  },
});

export const getById = query({
  args: { lampId: v.id('lamps') },
  handler: async (context, args) => {
    return await context.db.get(args.lampId);
  },
});

export const purchase = mutation({
  args: {
    _id: v.id('lamps'),
  },
  handler: async (context, args) => {
    const lamp = await context.db.get(args._id);
    const currentInventory = lamp?.inventory || 0;
    const inventory = Math.max(0, currentInventory - 1);

    if (inventory === 0 && lamp?._id) {
      context.scheduler.runAfter(30_000, internal.lamps.add, {
        lampId: lamp._id,
      });
    }

    return await context.db.patch(args._id, {
      inventory,
    });
  },
});

export const add = internalMutation({
  args: {
    lampId: v.id('lamps'),
  },
  handler: async (context, args) => {
    await context.db.patch(args.lampId, {
      inventory: 10,
    });

    const alerts = await context.db
      .query('alerts')
      .filter((q) => q.eq(q.field('lampId'), args.lampId))
      .collect();

    for (const alert of alerts) {
      await context.db.patch(alert._id, {
        active: true,
      });
    }

    await context.scheduler.runAfter(6000, internal.alerts.hide, {
      lampId: args.lampId,
    });
  },
});
