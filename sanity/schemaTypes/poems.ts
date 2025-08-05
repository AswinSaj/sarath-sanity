const poems = {
  name: "poem",
  title: "Poem",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the poem",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Photo associated with the poem",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Poem content (rich text)",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default poems;
