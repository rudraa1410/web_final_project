"use client";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useDiscoverMovie } from "../_utils/api";
import Image from "next/image";

export default function ViewAllMovies() {
  const [sortBy, setSortBy] = useState("title");
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;;
  const { movies, changePage, changeGenre, currentPage, totalPages, genres } =
    useDiscoverMovie(API_KEY);
  const filteredMovies = movies.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "rating") return b.vote_average - a.vote_average;
    if (sortBy === "popularity") return b.popularity - a.popularity;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Header searchComponent={<SearchBar API_KEY={API_KEY} />} />
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Discover Movies</h1>
        <div className="flex items-center gap-4 mb-8">
          <select
            onChange={(e) => changeGenre(e.target.value)}
            className="w-[180px] bg-gray-700 text-gray-100 rounded p-2"
          >
            {["All", ...genres.map((genre) => genre.name)].map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-[180px] bg-gray-700 text-gray-100 rounded p-2"
          >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden rounded-lg p-2"
            >
              <Link href={`/Details/${movie.id}`}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie.title}
                  width={250}
                  height={375}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-center">{movie.title}</h3>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{movie.release_date || "N/A"}</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{movie.vote_average || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            }`}
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
