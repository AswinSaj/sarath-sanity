import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "CONTACT",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Contact Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "The main image displayed on the left side of the contact section",
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      initialValue: "Let's work together",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram Handle",
      type: "string",
      description: "Instagram username (without @)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "email",
      media: "image",
    },
  },
});