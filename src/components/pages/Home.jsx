import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    getMovies.fethTrendingMovies().then(setTrendingMovies);
  }, []);

  return (
    <>
      <h2>Tranding today</h2>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
