import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';

export const active = query({
  args: {},
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity?.email) {
      console.error('no logged in user found');
      return [];
    }

    const activeAlerts = await context.db
      .query('alerts')
      .filter((q) => {
        return q.and(
          q.eq(q.field('email'), identity.email),
          q.eq(q.field('active'), true),
        );
      })
      .collect();

    return await Promise.all(
      activeAlerts.map(async (alert) => {
        const lamp = await context.db.get(alert.lampId);
        return {
          active: alert.active,
          lamp,
        };
      }),
    );
  },
});

export const hide = internalMutation({
  args: {
    lampId: v.id('lamps'),
  },
  handler: async (context, args) => {
    const alerts = await context.db
      .query('alerts')
      .filter((q) => q.eq(q.field('lampId'), args.lampId))
      .collect();

    for (const alert of alerts) {
      await context.db.delete(alert._id);
    }

    return;
  },
});

export const add = mutation({
  args: {
    lampId: v.id('lamps'),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity?.email) {
      console.error('no logged in user found');
      return;
    }

    return await context.db.insert('alerts', {
      email: identity?.email,
      lampId: args.lampId,
    });
  },
});

export const remove = mutation({
  args: {
    alertId: v.id('alerts'),
  },
  handler: async (context, args) => {
    return await context.db.delete(args.alertId);
  },
});

export const check = query({
  args: {
    lampId: v.id('lamps'),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity?.email) {
      console.error('no logged in user found');
      return;
    }

    const alert = await context.db
      .query('alerts')
      .filter((q) =>
        q.and(
          q.eq(q.field('email'), identity.email),
          q.eq(q.field('lampId'), args.lampId),
        ),
      )
      .first();

    return alert;
  },
});
