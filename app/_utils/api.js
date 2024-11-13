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

export function useNowPlayingMovies() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ea45b5b5c1ce4e3a5e780399be11eb06`');  // Replace with actual API URL
        const data = await response.json();
        console.log(data.results[0]);  // Log the first movie object
        setNowPlayingMovies(data.results || []);  // Set movies in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies;
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