'use client'

import { useState, useRef } from "react"
import Image from "next/image"
import { useTrendingMovies } from "../_utils/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function TrendingMoviesSection({ title, icon }) {
  const trendingMovies = useTrendingMovies()
  const scrollContainerRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h2>
        <Link href="/viewDetails">
          <Button
            variant="outline"
            className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-900"
          >
            View All
          </Button>
        </Link>
      </div>

      {/* Container for horizontal scrolling */}
      <div className="relative">
        <div 
          ref={scrollContainerRef} 
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {/* Grid layout for horizontal scrolling */}
          <div className="grid grid-flow-col auto-cols-[minmax(150px,200px)] gap-4 p-1">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <Link href={`/Details/${movie.id}`}>
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <h3 className="text-lg font-semibold text-center text-white">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Left scroll button */}
        {showLeftButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 hover:text-white"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Right scroll button */}
        {showRightButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 hover:text-white"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  )
}

