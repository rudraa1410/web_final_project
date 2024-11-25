'use client';

import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'ea45b5b5c1ce4e3a5e780399be11eb06';


export function useTrending() {
  const [TopTrending, setTrending] = useState([]);
  

  useEffect(() => {
    async function fetchTopTrending() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch Top Rated movies');
        }
        const data = await response.json();
        setTrending(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTopTrending();
  }, []);
  return TopTrending;
}


export function useTrendingMovies() {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrendingMovies();
  }, []);
  return movies;
}

export function useTrendingTV() {
  const [TV, setTV] = useState([]);
  

  useEffect(() => {
    async function fetchTrendingTV() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch trending TV');
        }
        const data = await response.json();
        setTV(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrendingTV();
  }, []);
  return TV;
}

export function useTopRatedMovie() {
  const [TopRatedMovie, setTopRatedMovie] = useState([]);
  

  useEffect(() => {
    async function fetchTopRatedMovie() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch Top Rated movies');
        }
        const data = await response.json();
        setTopRatedMovie(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTopRatedMovie();
  }, []);
  return TopRatedMovie;
}

export function useUpComingMovie() {
  const [UpComingMovie, setUpComingMovie] = useState([]);
  

  useEffect(() => {
    async function fetchUpComingMovie() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch Top Rated movies');
        }
        const data = await response.json();
        setUpComingMovie(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUpComingMovie();
  }, []);
  return UpComingMovie;
}




export function useDiscoverMovie(apiKey) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let genreParam = "";
        if (selectedGenre !== "All") {
          const genreId = genres.find((genre) => genre.name === selectedGenre)?.id;
          if (genreId) genreParam = `&with_genres=${genreId}`;
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}${genreParam}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre, apiKey]);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeGenre = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); // Reset to page 1 when changing genre
  };

  return { movies, changePage, changeGenre, currentPage, totalPages, genres };
}


export function useDetails(id) {
  const [details, setDetails] = useState(null);
  
  
  useEffect(() => {
    if (!id) return; // Ensure that an ID is provided

    async function fetchDetails() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ea45b5b5c1ce4e3a5e780399be11eb06`);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data); // Set the entire data object, not just `data.results`
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetails();
  }, [id]); // Depend on `id` to refetch if it changes

  return details;
}

export function useTrailer(id) {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    if (!id) return; // Ensure an ID is provided

    async function fetchTrailer() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=ea45b5b5c1ce4e3a5e780399be11eb06`);
        if (!response.ok) {
          throw new Error('Failed to fetch trailer');
        }
        const data = await response.json();

        // Find the official YouTube trailer
        const officialTrailer = data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Teaser' || 'Trailer'&& video.official 
        );

        if (officialTrailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${officialTrailer.key}`);
        } else {
          setTrailerUrl(null); // No official trailer found
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setTrailerUrl(null); // Set to null on error
      }
    }

    fetchTrailer();
  }, [id]);

  return trailerUrl;
}

export function useNowPlayingMovies() {
  const [NowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    async function fetchNowPlayingMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch Top Rated movies');
        }
        const data = await response.json();
        setNowPlayingMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNowPlayingMovies();
  }, []);
  return NowPlayingMovies;
}

export function usePeople() {
  const [People, setPeople] = useState([]);
  

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/person/day?api_key=ea45b5b5c1ce4e3a5e780399be11eb06' );
        if (!response.ok) {
          throw new Error('Failed to fetch Top Rated movies');
        }
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPeople();
  }, []);
  return People;
}