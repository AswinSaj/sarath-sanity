import { defineField, defineType } from "sanity";

export default defineType({
  name: "filmography",
  title: "Filmography",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Film Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL or Embed Code",
      type: "text",
      description: "YouTube URL, Vimeo URL, or iframe embed code",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artists",
      title: "Artists & Departments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "department",
              title: "Department",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Artist Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "department",
              subtitle: "name",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title: title,
        subtitle: `Order: ${order}`,
        media: selection.media,
      };
    },
  },
});