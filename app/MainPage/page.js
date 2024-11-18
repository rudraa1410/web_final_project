'use client';
import { UpComingMovie } from './UpComingMovie';
import { TopRatedMovie } from './TopRatedMovie';
import { TrendingMoviesSection } from './TrendingMoviesSection';
import { TrendingTVSection } from './TrendingTVSection';
import { NowPlayingMovies } from './FeaturedMovie';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUserAuth } from "../_utils/auth-context";

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
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, firebaseSignOut } = useUserAuth(); 
  

  const handleSearch = async (e) => {
    e.preventDefault()
   
  }

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push("/LoginPage");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
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
            <Link href="/WatchListPage" className="text-gray-300 hover:text-yellow-400">
              <Heart size={24} />
            </Link>
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user.displayName || "User"}!</span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/LoginPage" className="text-gray-300 hover:text-yellow-400">
                <User size={24} />
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
       

        {searchResults.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-white">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400">{item.title || item.name}</h3>
                  <p className="text-gray-300 text-sm">{item.overview.slice(0, 100)}...</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Movie Sections */}
        <NowPlayingMovies/>
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
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">About</Link>
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">Contact</Link>
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
