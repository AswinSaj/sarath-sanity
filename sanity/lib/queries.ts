import { groq } from "next-sanity";

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    description
  }
`;

export const filmographyQuery = groq`
  *[_type == "filmography"] | order(order asc) {
    _id,
    title,
    description,
    videoUrl,
    thumbnail {
      asset-> {
        _id,
        url
      },
      alt
    },
    artists[] {
      department,
      name
    },
    order
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    description,
    slug,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description,
    slug,
    photos[] {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const poetrySectionQuery = groq`
  *[_type == "poetrySection"][0] {
    _id,
    title,
    description,
    buttonText,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const allPoemsQuery = groq`
  *[_type == "poem"] | order(_createdAt desc) {
    _id,
    title,
    photo {
      asset-> {
        _id,
        url
      },
      alt
    },
    content
  }
`;

export const contactQuery = groq`
  *[_type == "contact"][0] {
    _id,
    title,
    heading,
    instagram,
    email,
    phone,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const allPhotosQuery = groq`
  *[_type == "category"] {
    photos[] {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const logoQuery = groq`
  *[_type == "logo"][0] {
    _id,
    logoImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    altText,
    fallbackText
  }
`;