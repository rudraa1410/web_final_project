// app/details/[id].js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDetails } from "../../_utils/api";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import {
  Search,
  Heart,
  User,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Film,
} from 'lucide-react'

const MovieDetail = () => {
  const {id} = useParams();
  const movie = useDetails(id);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const toggleTrailerVisibility = () => {
    setIsTrailerVisible((prev) => !prev);
  };

  // Function to add or remove movie from the watchlist
  const handleAddToWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

  
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
  }


  if (!movie) {
    return <p>Loading...</p>;  // Return a loading message while the movie data is being fetched
  }
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

<header className="bg-gray-800 py-4">
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
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">
              <Heart size={24} />
            </Link>
            <Link href="/LoginPage" className="text-gray-300 hover:text-yellow-400">
              <User size={24} />
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Movie Poster */}
            <div className="md:w-1/3">
              <Image
                src={
                  movie && movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.svg"
                }
                alt={movie ? movie.title : "Movie Title"}
                width={400}
                height={600}
              />
            </div>

            {/* Right column - Movie Details */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">
                {movie.release_date} •{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold">
                  {movie.vote_average}/10
                </span>
              </div>
              <p className="text-lg mb-6">{movie.overview}</p>

              {/* Watchlist and Trailer Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={toggleTrailerVisibility}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Watch Trailer
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  className={`flex items-center px-4 py-2 ${
                    isInWatchlist ? "bg-red-600" : "bg-green-600"
                  } text-white rounded-md hover:bg-red-700`}
                >
                  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
              </div>

              {isTrailerVisible && (
                <div className="mt-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
