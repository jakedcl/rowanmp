import { defineField, defineType } from "sanity";

export const record = defineType({
  name: "record",
  title: "Record",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shelf",
      title: "Shelf",
      type: "reference",
      to: [{ type: "shelf" }],
      validation: (rule) => rule.required(),
      description: "Which row this sleeve sits on",
    }),
    defineField({
      name: "sleeve",
      title: "Sleeve photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional for now — blank sleeve shows on the wall until you upload. Square crop via the hotspot.",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Order on shelf",
      type: "number",
      description: "Left → right. Lower first.",
      initialValue: 0,
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short line on the detail page",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Full write-up when someone opens this record",
    }),
    defineField({
      name: "relatedPost",
      title: "Related post (optional)",
      type: "reference",
      to: [{ type: "post" }],
      description: "Link out to a longer post if you want",
    }),
  ],
  orderings: [
    {
      title: "Shelf order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      shelf: "shelf.title",
      media: "sleeve",
    },
    prepare: ({ title, shelf, media }) => ({
      title,
      subtitle: shelf ? `Shelf: ${shelf}` : "No shelf",
      media,
    }),
  },
});
