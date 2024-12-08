import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTrending } from "../_utils/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TopTrending({ title, icon }) {
  const { topTrending, loading, error } = useTrending();
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h2>
        <Link href="/viewDetails">
          <Button
            variant="outline"
            className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-900"
          >
            View All
          </Button>
        </Link>
      </div>

      {/* Container for horizontal scrolling */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {/* Grid layout for horizontal scrolling */}
          <div className="grid grid-flow-col auto-cols-[minmax(150px,200px)] gap-4 p-1">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : topTrending.length === 0 ? (
              <div>No Trending Movies Available</div>
            ) : (
              topTrending.map((item) => (
                <div key={item.id} className="relative group">
                  <Link href={`/Details/${item.id}`}>
                    <Image
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "/placeholder.jpg"
                      }
                      alt={item.title || item.name}
                      width={250} // Adjust width for clearer images
                      height={375} // Adjust height proportionally
                      className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                      priority={false} // Set to false for lazy loading
                      loading="lazy" // Lazy loading enabled by default
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <h3 className="text-lg font-semibold text-center">
                        {item.name || item.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Left scroll button */}
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-8 rounded-full"
            aria-label="Scroll left"
          >
            &lt;
          </button>
        )}

        {/* Right scroll button */}
        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-8 rounded-full"
            aria-label="Scroll right"
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  );
}
