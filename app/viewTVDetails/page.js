"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Heart, User, Home } from "lucide-react";
import Image from "next/image";

// Custom hook to fetch TV data
const useDiscoverTV = (apiKey) => {
  const [TVs, setTVs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVs = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        const data = await response.json();
        setTVs(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Error fetching TV data:", err);
        setError(err);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError(err);
      }
    };

    fetchTVs();
    fetchGenres();
  }, [apiKey, currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const changeGenre = (genre) => {
    // Optional: Add functionality for filtering by genre
  };

  return { TVs, genres, currentPage, totalPages, changePage, changeGenre, error };
};

export default function ViewAllTVs() {
  const [sortBy, setSortBy] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { TVs = [], genres, currentPage, totalPages, changePage, changeGenre, error } =
    useDiscoverTV(API_KEY);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const filteredTVs = (Array.isArray(TVs) ? TVs : []).sort((a, b) => {
    if (sortBy === "title") return a.name?.localeCompare(b.name || "") || 0;
    if (sortBy === "rating") return (b.vote_average || 0) - (a.vote_average || 0);
    if (sortBy === "popularity") return (b.popularity || 0) - (a.popularity || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 z-10 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/MainPage" className="text-2xl font-bold text-yellow-400">
            TVDB
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">
              <Home size={24} />
            </Link>
            <Link href="/WatchListPage" className="text-gray-300 hover:text-yellow-400">
              <Heart size={24} />
            </Link>
            <Link href="/LoginPage" className="text-gray-300 hover:text-yellow-400">
              <User size={24} />
            </Link>
          </nav>
        </div>
      </header>
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Discover TVs</h1>
        {error && <p className="text-red-500">Error loading data. Please try again later.</p>}
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
          {filteredTVs.map((TV) => (
            <div
              key={TV.id}
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden rounded-lg p-2"
            >
              <Link href={`/TVDetails/${TV.id}`}>
                <Image
                  src={
                    TV.poster_path
                      ? `https://image.tmdb.org/t/p/w500${TV.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={TV.name || "TV Show"}
                  width={250}
                  height={375}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-center">{TV.name}</h3>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{TV.first_air_date || "N/A"}</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{TV.vote_average || "N/A"}</span>
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
  onClick={() => {
    changePage(Math.min(currentPage + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smoothly scrolls to the top
  }}
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
    </div>
  );
}
