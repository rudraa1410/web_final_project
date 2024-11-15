'use client'

import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronDown } from 'lucide-react'

// Expanded dummy data for movies with genres
const allMovies = [
  { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, poster: "/placeholder.svg?height=450&width=300" },
  { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, poster: "/placeholder.svg?height=450&width=300" },
  { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, poster: "/placeholder.svg?height=450&width=300" },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9, poster: "/placeholder.svg?height=450&width=300" },
  { id: 5, title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7, poster: "/placeholder.svg?height=450&width=300" },
  { id: 6, title: "Forrest Gump", year: 1994, genre: "Drama", rating: 8.8, poster: "/placeholder.svg?height=450&width=300" },
  { id: 7, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, poster: "/placeholder.svg?height=450&width=300" },
  { id: 8, title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2, poster: "/placeholder.svg?height=450&width=300" },
  { id: 9, title: "Fight Club", year: 1999, genre: "Drama", rating: 8.8, poster: "/placeholder.svg?height=450&width=300" },
  { id: 10, title: "Goodfellas", year: 1990, genre: "Crime", rating: 8.7, poster: "/placeholder.svg?height=450&width=300" },
  { id: 11, title: "The Silence of the Lambs", year: 1991, genre: "Thriller", rating: 8.6, poster: "/placeholder.svg?height=450&width=300" },
  { id: 12, title: "Schindler's List", year: 1993, genre: "Drama", rating: 8.9, poster: "/placeholder.svg?height=450&width=300" },
  // Add more movies as needed...
]

export default function ViewAllMovies() {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('title')
  const [movies, setMovies] = useState([])
  const [visibleMovies, setVisibleMovies] = useState(8)
  const [hoveredMovie, setHoveredMovie] = useState(null)

  const genres = ['All', ...new Set(allMovies.map(movie => movie.genre))]

  useEffect(() => {
    let filtered = allMovies.filter(movie =>
      selectedGenre === 'All' || movie.genre === selectedGenre
    )

    filtered.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return b.year - a.year
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

    setMovies(filtered)
  }, [selectedGenre, sortBy])

  const loadMore = () => {
    setVisibleMovies(prevVisible => Math.min(prevVisible + 8, movies.length))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 sm:mb-0">Discover Movies</h1>
          <div className="flex items-center gap-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {movies.slice(0, visibleMovies).map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <CardContent className="p-0">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-auto object-cover rounded-t-md"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold line-clamp-1">{movie.title}</h2>
                      <p className="text-sm text-gray-400">{movie.year}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {hoveredMovie === movie.id && (
                      <motion.div 
                        className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                          <p className="text-sm mb-4">{movie.genre}</p>
                          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {visibleMovies < movies.length && (
          <div className="mt-12 text-center">
            <Button onClick={loadMore} variant="outline" className="group">
              Load More
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}