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
      description: "Shown under the name in the site header",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
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
        "The whole homepage. Write text, drop in images, make headings — this is what visitors see.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
