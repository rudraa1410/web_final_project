import Image from "next/image";
import { useTrending } from "../_utils/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function TopTrending({ title, icon }) {
  const TopTrending = useTrending();

  return (
    <section className="mb-12">
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
      <div className="overflow-x-auto scrollbar-hide">
        {/* Grid layout for horizontal scrolling */}
        <div className="grid grid-flow-col auto-cols-[minmax(150px,200px)] gap-4">
          {TopTrending.map((TopTrending) => (
            <div key={TopTrending.id} className="relative group">
              <Link href={`/Details/${TopTrending.id}`}>
                <Image
                  src={
                    TopTrending.poster_path
                      ? `https://image.tmdb.org/t/p/w500${TopTrending.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt=""
                  width={250} // Adjust width for clearer images
                  height={375} // Adjust height proportionally
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <h3 className="text-lg font-semibold text-center">
                    {" "}
                    {TopTrending.name || TopTrending.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
