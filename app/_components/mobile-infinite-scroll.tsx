import { client } from "@/sanity/lib/client";
import { allPhotosQuery } from "@/sanity/lib/queries";
import { MobileInfiniteScrollClient } from "./mobile-infinite-scroll-client";

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface Category {
  photos: Photo[];
}

async function getAllPhotos(): Promise<Photo[]> {
  try {
    const categories: Category[] = await client.fetch(allPhotosQuery);
    // Flatten all photos from all categories
    const allPhotos = categories.flatMap(category => category.photos || []);
    return allPhotos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

export default async function MobileInfiniteScroll() {
  const photos = await getAllPhotos();
  
  if (photos.length === 0) {
    return null; // Don't render if no photos
  }

  return <MobileInfiniteScrollClient photos={photos} />;
}