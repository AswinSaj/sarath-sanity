"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { categoryBySlugQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import ImageLightbox from "@/app/_components/image-lightbox";
import BackButton from "@/app/_components/BackButton";

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface CategoryData {
  _id: string;
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  photos: Photo[];
}

async function getCategoryBySlug(slug: string): Promise<CategoryData | null> {
  try {
    const data = await client.fetch(categoryBySlugQuery, { slug });
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchCategory() {
      const resolvedParams = await params;
      const data = await getCategoryBySlug(resolvedParams.slug);
      if (!data) {
        notFound();
      }
      setCategory(data);
      setLoading(false);
    }

    fetchCategory();
  }, [params]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 w-40 bg-gray-800 rounded mb-8 animate-pulse" />
          <div className="h-12 w-64 bg-gray-800 rounded mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-800 rounded animate-pulse mb-16" />

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {Array.from({ length: 12 }).map((_, index) => {
              const heights = ["h-64", "h-80", "h-72", "h-96", "h-60", "h-88"];
              const height = heights[index % heights.length];

              return (
                <div
                  key={index}
                  className={`break-inside-avoid mb-4 ${height} bg-gray-800 rounded-lg animate-pulse`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 md:pt-24 py-20 px-6">
      {/* Back Button */}
      <BackButton href="/#photography" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">

          <h1 className="text-5xl font-bold tracking-wider text-center">{category.title}</h1>
          {category.description && (
            <p className="text-gray-300 text-lg mt-4 max-w-3xl text-center mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {/* Photos Grid */}
        {category.photos && category.photos.length > 0 ? (
          <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {category.photos.map((photo, index) => {
              // Create variety in aspect ratios for masonry effect
              const aspectRatios = [
                "aspect-[3/4]",   // Portrait
                "aspect-[4/3]",   // Landscape  
                "aspect-[1/1]",   // Square
                "aspect-[16/9]",  // Wide
                "aspect-[3/2]",   // Standard
                "aspect-[2/3]",   // Tall portrait
                "aspect-[5/4]",   // Slightly wide
                "aspect-[4/5]",   // Slightly tall
              ];

              const aspectRatio = aspectRatios[index % aspectRatios.length];

              return (
                <div
                  key={photo.asset._id}
                  className="break-inside-avoid mb-4 group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className={`relative ${aspectRatio} rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl`}>
                    <Image
                      src={photo.asset.url}
                      alt={photo.alt || `${category.title} photo ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-300 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Optional: Add a subtle border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">No Photos Yet</h3>
            <p className="text-gray-400">
              Photos for this category haven't been uploaded yet.
            </p>
          </div>
        )}

        {/* Image Lightbox */}
        {category.photos && (
          <ImageLightbox
            photos={category.photos}
            currentIndex={currentImageIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            categoryTitle={category.title}
          />
        )}
      </div>
    </div>
  );
}