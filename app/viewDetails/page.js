"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Heart, User } from "lucide-react";
import { useDiscoverMovie } from "../_utils/api";
import Image from "next/image";

export default function ViewAllMovies() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const movie = useDiscoverMovie();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=YOUR_API_KEY`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const genres = ["All", ...new Set(movie.map((movie) => movie.genre))];

  useEffect(() => {
    let filtered = movie.filter(
      (movie) => selectedGenre === "All" || movie.genre === selectedGenre
    );

    filtered.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "rating") return b.vote_average - a.vote_average;
      if (sortBy === "popularity") return b.popularity - a.popularity;
      return 0;
    });

    setMovies(filtered);
  }, [selectedGenre, sortBy, movie]);

  const loadMore = () => {
    setVisibleMovies((prevVisible) => Math.min(prevVisible + 8, movies.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 z-10 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/MainPage" className="text-2xl font-bold text-yellow-400">
            MovieDB
          </Link>
          <nav className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-700 text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </form>
            <Link
              href="/MainPage"
              className="text-gray-300 hover:text-yellow-400"
            >
              <Heart size={24} />
            </Link>
            <Link
              href="/LoginPage"
              className="text-gray-300 hover:text-yellow-400"
            >
              <User size={24} />
            </Link>
          </nav>
        </div>
      </header>
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 sm:mb-0">Discover Movies</h1>
          <div className="flex items-center gap-4">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-[180px] bg-gray-700 text-gray-100 rounded p-2"
            >
              {genres.filter(Boolean).map((genre) => (
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
              <option value="year">Year</option>
              <option value="rating">Rating</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.slice(0, visibleMovies).map((movie) => (
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

              {/* Movie Title, Rating, and Release Date */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-center">{movie.title}</h3>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{movie.release_date ? movie.release_date : "N/A"}</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{movie.vote_average ? movie.vote_average : "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleMovies < movies.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="bg-white text-gray-900 text-xl px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors flex items-center justify-center gap-3 mx-auto"
            >
              Load More
              <ChevronDown className="ml-2 h-6 w-6" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
