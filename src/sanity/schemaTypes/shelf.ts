import { defineField, defineType } from "sanity";

export const shelf = defineType({
  name: "shelf",
  title: "Shelf",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Shelf name",
      type: "string",
      description: 'Row label — e.g. "Research", "Diving & field"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first (top of the wall)",
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "Optional blurb under the shelf name",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", order: "order" },
    prepare: ({ title, order }) => ({
      title,
      subtitle: `Order ${order ?? 0}`,
    }),
  },
});
