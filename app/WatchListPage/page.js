"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Trash2, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search, Heart, User, Home } from "lucide-react";
import Link from "next/link";

const WatchListPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();

  const fetchWatchlist = async () => {
    if (!user) {
      setError("You need to log in to view your watchlist.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "watchlist")
      );
      const movies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWatchlist(movies);
    } catch (err) {
      setError(err.message || "Failed to load watchlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (movie) => {
    if (!user) {
      alert("You need to log in to remove movies from your watchlist.");
      return;
    }

    try {
      const watchlistRef = doc(
        db,
        "users",
        user.uid,
        "watchlist",
        movie.id.toString()
      );
      await deleteDoc(watchlistRef);

      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));

      alert(`${movie.title} has been removed from your watchlist.`);
    } catch (error) {
      alert("Failed to remove movie from watchlist. Please try again.");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 z-10 flex items-center shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/MainPage" className="text-2xl font-bold text-yellow-400">
            MovieDB
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">
              <Home size={24} />
            </Link>
            <Link href="/WatchListPage" className="text-gray-300 hover:text-yellow-400">
              <Heart size={24} />
            </Link>
            <Link href="/LoginPage" className="text-gray-300 hover:text-yellow-400">
              <User size={24} />
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">My Watchlist</h1>
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">
            Your watchlist is empty. Add some movies!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden rounded-lg p-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ""}`}
                  alt={`${movie.title || "Movie"} poster`}
                 
                  width={250}
                  height={375}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <h2 className="text-xl font-bold truncate">{movie.title}</h2>
                <p className="text-gray-400">
                  {movie.release_date || "Unknown Release Date"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span>
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-blue-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.runtime ? `${movie.runtime} mins` : "N/A"}</span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="w-full bg-red-600 hover:bg-red-700 mt-4 transition-colors duration-300"
                  onClick={() => handleRemoveFromWatchlist(movie)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove from Watchlist
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
