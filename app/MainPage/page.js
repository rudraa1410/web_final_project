'use client'

import { UpComingMovie } from './UpComingMovie';
import { TopRatedMovie } from './TopRatedMovie';
import { TrendingMoviesSection } from './TrendingMoviesSection';
import { TrendingTVSection } from './TrendingTVSection';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { TopTrending } from './TopTrending';
import { People } from './People';

// Ensure to import your custom sections here


  // If this is the default, ensure the correct path

export default function MovieDatabaseHome() {
  const [searchQuery, setSearchQuery] = useState('')
  

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
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
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=384&width=1024"
              alt="Featured Movie"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl font-bold mb-2">Featured Movie Title</h1>
              <p className="text-lg mb-4">Brief description of the featured movie</p>
              <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                Watch Trailer
              </Button>
            </div>
          </div>
        </section>

        {/* Movie Sections */}
        <TopTrending title="Top Trending Today" icon={<TrendingUp size={24} />} />
        <TrendingMoviesSection title="Top Trending Movies" icon={<TrendingUp size={24} />} />
        <TrendingTVSection title="Popular TV- Series" icon={<TrendingUp size={24} />} />
        <TopRatedMovie title="Top Rated Movies" icon={<Star size={24} />} />
        <UpComingMovie title="Upcoming Movies" icon={<Calendar size={24} />} />
        <People title="Trending Celebrity" icon={<User size={24} />} />
        

      
        {/* <MovieSection title="Top Rated Movies" icon={<Star size={24} />} />
        <MovieSection title="Award Winners" icon={<Award size={24} />} />
        <MovieSection title="Coming Soon" icon={<Calendar size={24} />} />
        <MovieSection title="Editor's Picks" icon={<Film size={24} />} /> */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MovieDB. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/about" className="text-gray-300 hover:text-yellow-400">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400">Contact</Link>
            <Link href="/privacy" className="text-gray-300 hover:text-yellow-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
