import { client } from "@/sanity/lib/client";
import { poetrySectionQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface PoetrySection {
  _id: string;
  title: string;
  description: string;
  buttonText: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
}

async function getPoetrySectionData(): Promise<PoetrySection | null> {
  try {
    const data = await client.fetch(poetrySectionQuery);
    return data;
  } catch (error) {
    console.error("Error fetching poetry section:", error);
    return null;
  }
}

export default async function Poetry() {
  const poetrySection = await getPoetrySectionData();

  // Fallback content if no data is available
  const fallbackData = {
    title: "POETRY",
    description: "To know more about Sarath's inner world and the depth at which he exists, read some of his poems he looks forward to publish.",
    buttonText: "View More"
  };

  const displayData = poetrySection || fallbackData;

  return (
    <section id="poetry" className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8 tracking-wider">{displayData.title}</h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden">
            {poetrySection?.image ? (
              <Image
                src={poetrySection.image.asset.url}
                alt={poetrySection.image.alt || "Poetry"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <p className="text-lg">Add Poetry Image in Sanity</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                {displayData.description}
              </p>
            </div>

            {/* View More Button */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/poem"
                className="inline-flex items-center group text-lg font-medium hover:text-gray-300 transition-colors duration-300"
              >
                <span className="mr-4">{displayData.buttonText}</span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}