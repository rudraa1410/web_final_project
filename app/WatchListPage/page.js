"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase";
import { collection, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore";
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
      setError("Failed to load watchlist. Please try again later.");
      console.error("Error fetching watchlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a movie from Firestore and update state
  const removeFromWatchlist = async (movieId) => {
    if (!user) {
      setError("You need to log in to modify your watchlist.");
      return;
    }

    try {
      console.log("Deleting movie with ID:", movieId);
      const watchlistRef = doc(db, "users", user.uid, "watchlist", movieId);

      // Check if document exists
      const docSnap = await getDoc(watchlistRef);
      if (!docSnap.exists()) {
        console.error(`Document with ID ${movieId} does not exist.`);
        alert("Movie does not exist in your watchlist.");
        return;
      }

      // Delete document
      await deleteDoc(watchlistRef);

      // Update local state
      setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
      console.log("Movie successfully removed from watchlist.");
    } catch (err) {
      setError("Failed to remove movie. Please try again.");
      console.error("Error removing movie:", err);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="mb-4 rounded-lg object-cover h-80 w-full"
                />
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <p className="text-gray-400">{movie.release_date}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.runtime} mins</span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="w-full bg-red-600 hover:bg-red-700 mt-4 transition-colors duration-300"
                  onClick={() => removeFromWatchlist(movie.id)}
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
