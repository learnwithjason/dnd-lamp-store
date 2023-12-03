import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  lamps: defineTable({
    name: v.string(),
    description: v.string(),
    inventory: v.number(),
    image: v.string(),
    slug: v.string(),
    price: v.number(),
  }),
  alerts: defineTable({
    email: v.string(),
    lampId: v.id('lamps'),
    active: v.optional(v.boolean()),
  }),
});
