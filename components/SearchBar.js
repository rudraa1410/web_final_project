"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar({ API_KEY }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSearchResults = async () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      setDropdownVisible(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchText
        )}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

  return (
    <form className="relative w-full md:w-96">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search movies, TV shows, or people..."
          className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            debouncedFetchSearchResults();
          }}
          onFocus={() => setDropdownVisible(true)}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </span>
      </div>
      {isDropdownVisible && searchResults.length > 0 && (
        <ul className="absolute z-50 w-full bg-gray-900 text-gray-100 mt-2 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
            >
              <Link
                href={
                  result.media_type === "movie"
                    ? `/Details/${result.id}`
                    : result.media_type === "tv"
                    ? `/TVDetails/${result.id}`
                    : `/person/${result.id}`
                }
                className="flex items-center space-x-3"
              >
                <Image
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={result.title || result.name}
                  width={50}
                  height={75}
                  className="rounded-md"
                />
                <div>
                  <p className="font-semibold text-yellow-400">
                    {result.name || result.title || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {result.media_type === "movie"
                      ? "Movie"
                      : result.media_type === "tv"
                      ? "TV Show"
                      : "Person"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
