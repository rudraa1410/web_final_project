"use client";

import { useUserAuth } from "../_utils/auth-context";
import { NowPlayingMovies } from "./FeaturedMovie";
import { People } from "./People";
import { TopRatedMovie } from "./TopRatedMovie";
import { PopularTV } from "./PopularTV";
import { TopRatedTV } from "./TopRatedTV";
import { TopTrending } from "./TopTrending";
import { TrendingMoviesSection } from "./TrendingMoviesSection";
import { TrendingTVSection } from "./TrendingTVSection";
import { UpComingMovie } from "./UpComingMovie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
  Search,
  Heart,
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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MovieDatabaseHome() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { user, firebaseSignOut } = useUserAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [hoveredIcon, setHoveredIcon] = useState(null);

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

  // Debounced version of the fetch function
  const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

  useEffect(() => {
    setIsDataLoaded(false); // Set loading state
    debouncedFetchSearchResults();
  }, [searchText]);
  
  useEffect(() => {
    if (searchText.trim() !== "") {
      setIsDataLoaded(true); // Set to true once data is fetched
    }
  }, [searchResults]);
  

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rudra-solanki-90207925b/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rudra141004/web_final_project",
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:solankirudra1410.email@gmail.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/rudra._1410",
    },
  ];

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
            <form className="relative w-full md:w-96">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies, TV shows, or people..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </span>
              </div>
              {isDataLoaded &&isDropdownVisible && searchResults.length > 0 && (
                <ul className="absolute z-50 w-full bg-gray-900 text-gray-100 mt-2 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                    >
                      <Link
                        href={`/Details/${result.id}`}
                        onClick={() => {
                          setSearchText("");
                          setDropdownVisible(false);
                        }}
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
                          priority={true}
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
            <Link
              href="/WatchListPage"
              className="text-gray-300 hover:text-yellow-400"
            >
              <Heart size={24} />
            </Link>
            {user ? (
              <>
                <span className="text-gray-300">
                  Hello, {user.displayName || "User"}!
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/LoginPage"
                className="text-gray-300 hover:text-yellow-400"
              >
                <User size={24} />
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}

        {/* Movie Sections */}
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
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                About Me
              </h2>
              <p className="text-gray-300 text-1xl leading-relaxed">
                My Name is Rudra Solanki !. I am a dedicated and passionate
                software developer student, currently pursuing my journey into
                the world of technology and innovation. With a strong foundation
                in programming languages such as Java, Python, JavaScript, and
                C++, I am constantly exploring new tools and technologies to
                build efficient and creative solutions.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="grid grid-cols-4 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                    onMouseEnter={() => setHoveredIcon(link.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <link.icon
                      size={20}
                      className={`text-yellow-400 transition-all duration-300 ${
                        hoveredIcon === link.name ? "scale-125" : ""
                      }`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center"></div>
        </div>
      </footer>
    </div>
  );
}