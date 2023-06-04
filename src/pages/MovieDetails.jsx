import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieById, setMovieById] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    getMovies
      .fetchMovieById(movieId)
      .then(setMovieById)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (!movieById) {
    return <div>Loading...</div>;
  }

  const {
    poster_path,
    title,
    genres,
    id,
    vote_average,
    overview,
    release_date,
  } = movieById;

  const movieSort = {
    genres:
      genres.length <= 3
        ? genres.map(genre => genre.name).join(' ')
        : genres
            .map(genre => genre.name)
            .slice(0, 2)
            .join(' ') + ' Other',
    voteAverage: vote_average.toFixed(1) * 10,
    overview,
    releaseDate: release_date.slice(0, 4),
  };

  const backLink = location.state?.from ?? '/';
  const defaultImg = `https://www.restorixhealth.com/wp-content/uploads/2018/08/No-Image.png`;

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      <Link to={backLink}>Go back</Link>
      {movieById && (
        <>
          <div className="movieById__container">
            <img
              className="poster__foto"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : defaultImg
              }
              alt={title}
              width="250"
            />
            <div>
              <h2>
                {title} <span>({movieSort.releaseDate})</span>
              </h2>
              <p>User Score: {movieSort.voteAverage}%</p>
              <h2>Overview</h2>
              <p>{movieSort.overview}</p>
              <h3>Genres</h3>
              <p>{movieSort.genres}</p>
            </div>
          </div>
          <div className="movie__info">
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={`/movies/${id}/cast`}
                  state={{ from: location.state?.from } ?? '/'}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={`/movies/${id}/reviews`}
                  state={{ from: location.state?.from } ?? '/'}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetail;
