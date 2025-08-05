const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the photograph category",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description of the category",
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      description: "Optional main image representing the category",
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description:
        "Upload multiple images for this category. You can drag and drop or select multiple files to upload them in bulk.",
    },
  ],
};

export default category;
