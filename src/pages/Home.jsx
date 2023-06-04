import MoviesList from 'components/MoviesList/MoviesList';
import { useState, useEffect } from 'react';
import * as getMovies from 'services/moviesApi';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getMovies
      .fethTrendingMovies()
      .then(setTrendingMovies)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h2>Tranding today</h2>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      <MoviesList movies={trendingMovies} />
    </>
  );
};

export default Home;
