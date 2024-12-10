"use client";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import SearchBar from "@/components/SearchBar";
import { NowPlayingMovies } from "./FeaturedMovie";
import { People } from "./People";
import { TopRatedMovie } from "./TopRatedMovie";
import { PopularTV } from "./PopularTV";
import { TopRatedTV } from "./TopRatedTV";
import { TopTrending } from "./TopTrending";
import { TrendingMoviesSection } from "./TrendingMoviesSection";
import { TrendingTVSection } from "./TrendingTVSection";
import { UpComingMovie } from "./UpComingMovie";
import { useEffect } from "react";
import {
  User,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Film,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";

export default function MovieDatabaseHome() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Header searchComponent={<SearchBar API_KEY={API_KEY} />} />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <NowPlayingMovies />
        <TopTrending
          title="Top Trending Today"
          icon={<TrendingUp size={24} />}
        />
        <TrendingMoviesSection
          title="Top Trending Movies"
          icon={<Film size={24} />}
        />
        <TopRatedMovie title="Top Rated Movies" icon={<Star size={24} />} />
        <UpComingMovie title="Upcoming Movies" icon={<Calendar size={24} />} />
        <TrendingTVSection
          title="Trending TV- Series"
          icon={<TrendingUp size={24} />}
        />
        <PopularTV title="Popular TV- Series" icon={<Award size={24} />} />
        <TopRatedTV title="Top Rated TV- Series" icon={<Star size={24} />} />

        <People title="Trending Celebrity" icon={<User size={24} />} />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
