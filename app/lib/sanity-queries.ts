import { client } from "../../sanity/lib/client";

// GROQ query to fetch hero video data
const HERO_VIDEO_QUERY = `*[_type == "heroVideo"][0]{
  title,
  video{
    asset->{
      _id,
      url,
      mimeType,
      size
    }
  },
  poster{
    asset->{
      _id,
      url
    }
  },
  autoplay,
  loop,
  muted
}`;

export interface HeroVideoData {
  title?: string;
  video?: {
    asset?: {
      _id: string;
      url: string;
      mimeType: string;
      size: number;
    };
  };
  poster?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export async function getHeroVideo(): Promise<HeroVideoData | null> {
  try {
    const heroVideo = await client.fetch(HERO_VIDEO_QUERY);
    return heroVideo;
  } catch (error) {
    console.error("Error fetching hero video:", error);
    return null;
  }
}
