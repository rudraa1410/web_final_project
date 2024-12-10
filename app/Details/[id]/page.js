"use client";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import SearchBar from "@/components/SearchBar";
import { useDetails } from "../../_utils/api";
import { useTrailer } from "../../_utils/api";
import { Credits } from "../../_utils/api";
import { useUserAuth } from "../../_utils/auth-context";
import { db } from "../../_utils/firebase";
import { doc, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import { Search, Heart, User, Play, Plus, Minus, Home } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();
  const movie = useDetails(id);
  const trailerUrl = useTrailer(id);
  const credits = Credits(id);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Check if movie is in the watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      if (user && movie) {
        const watchlistRef = doc(
          db,
          "users",
          user.uid,
          "watchlist",
          movie.id.toString()
        );
        const docSnap = await getDoc(watchlistRef);
        setIsInWatchlist(docSnap.exists());
      }
    };

    checkWatchlist();
  }, [user, movie]);

  const toggleTrailerVisibility = () => {
    setIsTrailerVisible((prev) => !prev);
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert("You need to log in to add movies to your watchlist.");
      router.push("/LoginPage");
      return;
    }

    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      runtime: movie.runtime,
      vote_average: movie.vote_average,
      tagline: movie.tagline,
    };

    try {
      const watchlistRef = doc(
        collection(db, "users", user.uid, "watchlist"),
        movie.id.toString()
      );
      await setDoc(watchlistRef, movieData);
      setIsInWatchlist(true); // Update state to reflect addition
      alert(`${movie.title} has been added to your watchlist.`);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      alert("Failed to add movie to watchlist. Please try again.");
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!user) {
      alert("You need to log in to remove movies from your watchlist.");
      router.push("/LoginPage");
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
      setIsInWatchlist(false); // Update state to reflect removal
      alert(`${movie.title} has been removed from your watchlist.`);
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      alert("Failed to remove movie from watchlist. Please try again.");
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header searchComponent={<SearchBar API_KEY={API_KEY} />} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Movie Poster */}
            <div className="md:w-1/3">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.svg"
                }
                alt={movie.title}
                loading="lazy"
                width={400}
                height={600}
              />
            </div>

            {/* Right column - Movie Details */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-yellow-400 mb-2">Tagline: {movie.tagline}</p>
              <p>Runtime: {movie.runtime} mins</p>
              <p className="text-gray-400 mb-4">
                Release Date: {movie.release_date} •{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold">
                  Rating: {movie.vote_average}/10
                </span>
              </div>
              <p className="text-lg mb-6">{movie.overview}</p>

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
      <Footer />
    </div>
  );
};

export default MovieDetail;
