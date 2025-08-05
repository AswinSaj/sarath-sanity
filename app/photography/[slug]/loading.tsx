export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-16">
          <div className="h-6 w-40 bg-gray-800 rounded mb-8 animate-pulse" />
          <div className="h-12 w-64 bg-gray-800 rounded mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Photos Grid Skeleton */}
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