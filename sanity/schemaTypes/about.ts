import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
      description: "The main about description text",
    }),
  ],
  preview: {
    select: {
      title: "description",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: "About Section",
        subtitle: title ? `${title.substring(0, 50)}...` : "No description",
      };
    },
  },
});