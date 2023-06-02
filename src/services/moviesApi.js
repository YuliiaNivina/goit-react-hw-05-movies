import axios from 'axios';

const API_KEY = 'de2f3a0c57a311cc48a85909660d7281';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (url = '') => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function fethTrendingMovies() {
  const data = await fetchMovies(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  return data.results;
}

export function fetchMovieById(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export async function fetchMovieCast(movieId) {
  const data = await fetchMovies(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );

  return data.cast;
}

export async function fetchMovieReviews(movieId) {
  const data = await fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );

  return data.results;
}

export async function fetchMoviesBySearch(searchQuery) {
  const data = await fetchMovies(
    `${BASE_URL}/search/movie?query=${searchQuery}&api_key=${API_KEY}`
  );

  return data.results;
}
