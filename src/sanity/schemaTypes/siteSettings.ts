import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      description: "Shown under the name",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      description:
        "Wide photo beside the About text on the homepage. A field or river photo works best.",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "contactImage",
      title: "Contact photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Tall photo on the right of the Contact page. A forested river works best.",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "cv",
      title: "CV (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "page",
      title: "Home page",
      type: "blockContent",
      description:
        "The main column. Write text, drop in images, make headings — this is what visitors read.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "portrait" },
  },
});
