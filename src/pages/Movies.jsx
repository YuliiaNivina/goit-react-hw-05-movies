import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesList from 'components/MoviesList/MoviesList';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!movieId) return;
  }, [movieId]);

  useEffect(() => {
    setIsLoading(true);
    getMovies
      .fetchMoviesBySearch(query)
      .then(setSearchMovies)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <>
      <SearchForm setSearchParams={setSearchParams} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      <MoviesList movies={searchMovies} />
    </>
  );
};

export default Movies;
