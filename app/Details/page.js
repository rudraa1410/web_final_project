'use client'

import { useState } from 'react'
import { Star, Clock, Calendar, Film, Plus } from 'lucide-react'
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { Search, Heart, User } from 'lucide-react'
import Image from 'next/image';

export default function MovieDetail() {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isTrailerVisible, setIsTrailerVisible] = useState(false)

  const movie = {
    title: "Inception",
    year: "2010",
    rating: "8.8",
    duration: "2h 28min",
    genre: "Action, Adventure, Sci-Fi",
    releaseDate: "16 July 2010",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    poster: "/placeholder.svg?height=600&width=400",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
  }

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist)
  }

  const toggleTrailerVisibility = () => {
    setIsTrailerVisible(!isTrailerVisible)
  }
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
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
            <Link href="/wishlist" className="text-gray-300 hover:text-yellow-400">
              <Heart size={24} />
            </Link>
            <Link href="/LoginPage" className="text-gray-300 hover:text-yellow-400">
              <User size={24} />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Movie Poster */}
            <div className="md:w-1/3">
              <Image
                src={movie.poster}
                alt={`${movie.title} Poster`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Right column - Movie Details */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">{movie.year} • {movie.genre}</p>

              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="text-xl font-semibold">{movie.rating}/10</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>

              <p className="text-lg mb-6">{movie.overview}</p>

              <div className="mb-6">
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Stars:</strong> {movie.stars.join(', ')}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Watch Trailer Button */}
                <button
                  onClick={toggleTrailerVisibility}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Film className="w-4 h-4 mr-2" />
                  Watch Trailer
                </button>

                {/* Add to Watchlist Button */}
                <button
                  onClick={handleAddToWatchlist}
                  className={`flex items-center px-4 py-2 ${isInWatchlist ? 'bg-red-600' : 'bg-green-600'} text-white rounded-md hover:${isInWatchlist ? 'bg-red-700' : 'bg-green-700'}`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
              </div>

              {/* Trailer Embed (Only visible when the trailer button is clicked) */}
              {isTrailerVisible && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Official Trailer</h2>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={movie.trailerUrl}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
