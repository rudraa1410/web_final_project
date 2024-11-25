"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Trash2, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WatchListPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    if (!user) {
      setError("You need to log in to view your watchlist.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Fetching watchlist for user:", user?.uid);
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
      console.error("Error fetching watchlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle removing a movie from the watchlist
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

      // Update state to reflect removal
      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));

      alert(`${movie.title} has been removed from your watchlist.`);
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
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
      <div className="container mx-auto px-4 py-8">
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
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ""}`}
                  alt={`${movie.title || "Movie"} poster`}
                  className="mb-4 rounded-lg object-cover h-80 w-full"
                />
                <h2 className="text-xl font-bold">{movie.title}</h2>
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
