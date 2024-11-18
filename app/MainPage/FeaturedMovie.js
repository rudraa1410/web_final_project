import Image from "next/image";
import { useState } from "react";
import { Search } from 'lucide-react';

export function NowPlayingMovies() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
  };

  

  return (
    <section className="relative w-full h-[350px] bg-cover bg-center bg-no-repeat overflow-hidden">
    <Image
      src="/banner.jpg?height=500&width=1000"
      alt="Movie Banner"
      layout="fill"
      objectFit="cover"
      className="z-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10">
      <div className="container mx-auto h-full flex flex-col justify-end items-start px-4 pb-16">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Welcome </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">Discover movies and TV shows. Explore now.</p>
        <form onSubmit={handleSearch} className="w-full max-w-3xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a movie, tv show, person......"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-4 pr-12 text-lg text-white bg-white/20 backdrop-blur-md rounded-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
            />
            <button 
              type="submit" 
              className="absolute right-1 top-1 p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition duration-300"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  );
}
