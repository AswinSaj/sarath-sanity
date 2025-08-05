import { defineField, defineType } from "sanity";

export default defineType({
  name: "logo",
  title: "Logo",
  type: "document",
  fields: [
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      description: "The logo image to display in the navbar",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Alternative text for the logo image",
    }),
    defineField({
      name: "fallbackText",
      title: "Fallback Text",
      type: "string",
      initialValue: "SM",
      description: "Text to display if logo image is not available",
    }),
  ],
  preview: {
    select: {
      title: "altText",
      media: "logoImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: "Logo Configuration",
        subtitle: title || "No alt text",
        media,
      };
    },
  },
});