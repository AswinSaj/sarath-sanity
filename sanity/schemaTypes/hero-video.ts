const heroVideo = {
  name: "heroVideo",
  title: "Hero Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "A short title for the video section",
    },
    {
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Upload the hero video file",
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "image",
      description: "Optional poster image for the video",
    },
    {
      name: "autoplay",
      title: "Autoplay",
      type: "boolean",
      initialValue: true,
      description: "Should the video play automatically?",
    },
    {
      name: "loop",
      title: "Loop",
      type: "boolean",
      initialValue: true,
      description: "Should the video loop?",
    },
    {
      name: "muted",
      title: "Muted",
      type: "boolean",
      initialValue: true,
      description: "Should the video be muted by default?",
    },
  ],
};

export default heroVideo;
