import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
}

async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.fetch(categoriesQuery);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Photography() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4 tracking-wider">PHOTOGRAPHY</h2>
          <p className="text-gray-400">No categories available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="photography" className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8 tracking-wider">PHOTOGRAPHY</h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {categories.map((category, index) => {
            // Define different aspect ratios for variety
            const aspectRatios = [
              "aspect-[3/4]",   // Portrait
              "aspect-[4/3]",   // Landscape
              "aspect-[1/1]",   // Square
              "aspect-[16/9]",  // Wide
              "aspect-[3/2]",   // Standard
              "aspect-[2/3]",   // Tall portrait
            ];
            
            const aspectRatio = aspectRatios[index % aspectRatios.length];

            return (
              <Link
                key={category._id}
                href={`/photography/${category.slug.current}`}
                className="block break-inside-avoid mb-4 group cursor-pointer"
              >
                <div className={`relative ${aspectRatio} rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl`}>
                  {category.image ? (
                    <Image
                      src={category.image.asset.url}
                      alt={category.image.alt || category.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Title */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl md:text-2xl text-center px-4 transform transition-all duration-300 group-hover:scale-110">
                      {category.title}
                    </h3>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}