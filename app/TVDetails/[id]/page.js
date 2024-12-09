"use client";

import { useTVDetails } from "../../_utils/api";
import { useTVTrailer } from "../../_utils/api";
import { Credits } from "../../_utils/api";
import { useUserAuth } from "../../_utils/auth-context";
import { db } from "../../_utils/firebase";
import { Input } from "@/components/ui/input";
import { doc, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import { Search, Heart, User, Play, Plus, Minus ,Home} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const TVDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user, firebaseSignOut } = useUserAuth();
  const TV = useTVDetails(id);
  const trailerUrl = useTVTrailer(id);
  const credits = Credits(id);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Check if TV is in the watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      if (user && TV) {
        const watchlistRef = doc(
          db,
          "users",
          user.uid,
          "watchlist",
          TV.id.toString()
        );
        const docSnap = await getDoc(watchlistRef);
        setIsInWatchlist(docSnap.exists());
      }
    };

    checkWatchlist();
  }, [user, TV]);

  const toggleTrailerVisibility = () => {
    setIsTrailerVisible((prev) => !prev);
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert("You need to log in to add TVs to your watchlist.");
      router.push("/LoginPage");
      return;
    }

    const TVData = {
      id: TV.id,
      title: TV.title,
      poster_path: TV.poster_path,
      release_date: TV.release_date,
      runtime: TV.runtime,
      vote_average: TV.vote_average,
      tagline: TV.tagline,
    };

    try {
      const watchlistRef = doc(
        collection(db, "users", user.uid, "watchlist"),
        TV.id.toString()
      );
      await setDoc(watchlistRef, TVData);
      setIsInWatchlist(true); // Update state to reflect addition
      alert(`${TV.title} has been added to your watchlist.`);
    } catch (error) {
      console.error("Error adding TV to watchlist:", error);
      alert("Failed to add TV to watchlist. Please try again.");
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!user) {
      alert("You need to log in to remove TVs from your watchlist.");
      router.push("/LoginPage");
      return;
    }

    try {
      const watchlistRef = doc(
        db,
        "users",
        user.uid,
        "watchlist",
        TV.id.toString()
      );
      await deleteDoc(watchlistRef);
      setIsInWatchlist(false); // Update state to reflect removal
      alert(`${TV.title} has been removed from your watchlist.`);
    } catch (error) {
      console.error("Error removing TV from watchlist:", error);
      alert("Failed to remove TV from watchlist. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchText.trim() === "") return;

    try {
      const response = await fetch(
        `https://api.theTVdb.org/3/search/multi?query=${encodeURIComponent(
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

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push("/MainPage");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!TV) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/MainPage" className="text-2xl font-bold text-yellow-400">
            TVDB
          </Link>
          <nav className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search TVs, TV shows, or people..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Dropdown Menu */}
              {isDropdownVisible && searchResults.length > 0 && (
                <ul className="absolute z-50 w-full bg-gray-900 text-gray-100 mt-2 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                    >
                      <Link
                        href={`/Details/${result.id}`}
                        onClick={() => {
                          // Clear the search and hide the dropdown
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
                            {result.media_type === "TV"
                              ? "TV"
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

            {user ? (
              <>
                <Link
                  href="/WatchListPage"
                  className="text-gray-300 hover:text-yellow-400"
                >
                  <Heart size={24} />
                </Link>
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
              <Link
              href="/MainPage"
              className="text-gray-300 hover:text-yellow-400"
            >
              <Home size={24} />
            </Link>
          </nav>
         
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - TV Poster */}
            <div className="md:w-1/3">
              <Image
                src={
                  TV.poster_path
                    ? `https://image.tmdb.org/t/p/w500${TV.poster_path}`
                    : "/placeholder.svg"
                }
                alt={TV.title}
                loading="lazy"
                width={400}
                height={600}
              />
            </div>

            {/* Right column - TV Details */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">{TV.original_name}</h1>
              
              
              <p className="text-gray-400 mb-4">
                Release Date: {TV.first_air_date} •{" "}
                {TV.genres.map((genre) => genre.name).join(", ")}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold">
                  Rating: {TV.vote_average}/10
                </span>
              </div>
              <p className="text-lg mb-6">{TV.overview}</p>

              {/* Cast List */}
              {credits?.cast && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                  <div className="flex overflow-x-auto gap-0 pb-2 scrollbar-hide">
                    {credits.cast.slice(0, 100).map((actor) => (
                      <div
                        key={actor.id}
                        className="flex-shrink-0 flex flex-col items-center text-center bg-gray-900 p-2 rounded-lg"
                      >
                        <Image
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                              : "/placeholder.svg"
                          }
                          alt={actor.name}
                          width={80}
                          height={80}
                          loading="lazy"
                          className="rounded-sm object-cover"
                        />
                        <span className="mt-2 text-sm">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Watchlist and Trailer Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={toggleTrailerVisibility}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Play /> Watch Trailer
                </button>
                {isInWatchlist ? (
                  <button
                    onClick={handleRemoveFromWatchlist}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Minus /> Remove from Watchlist
                  </button>
                ) : (
                  <button
                    onClick={handleAddToWatchlist}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Plus />
                    Add to Watchlist
                  </button>
                )}
              </div>

              {isTrailerVisible && trailerUrl && (
                <div className="mt-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={trailerUrl}
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

export default TVDetail;
