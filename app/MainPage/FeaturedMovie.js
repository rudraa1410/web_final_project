import { useNowPlayingMovies } from "../_utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function NowPlayingMovies() {
  const nowPlayingMovies = useNowPlayingMovies();

  // Check if `nowPlayingMovies` is undefined, null, or empty
  if (!nowPlayingMovies || !Array.isArray(nowPlayingMovies) || nowPlayingMovies.length === 0) {
    return <p>Loading...</p>; // Display loading text if data is still fetching
  }

  return (
    <section className="relative w-full mb-12 overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className="relative min-w-full snap-center">
            <Link href={`/Details/${movie.id}`}>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                      : "/placeholder.svg" // Use placeholder if image is missing
                  }
                  alt={movie.title || "Featured Movie"}
                  layout="fill"
                  objectFit="scale-down" // Adjust to 'cover' for full image display
                  className="rounded-none"
                  priority
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                {/* Movie title */}
                <div className="absolute center-10 left-10">
                  <h3 className="text-4xl font-semibold text-white">{movie.title}</h3>
              
                <div className="flex justify-between items-center mt-4">
                  {/* Release Date */}
                  <p className="text-sm text-gray-400">
                    <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg font-semibold">{movie.vote_average}</span>
                    <span className="ml-1 text-sm text-gray-400">/ 10</span>
                  </div>
                </div>
                  <p className="text-lg text-white mt-1">Now Playing</p>
                </div>
              </div>

            
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
