import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieById, setMovieById] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getMovies.fetchMovieById(movieId).then(setMovieById);
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
    posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
    genres:
      genres.length <= 3
        ? genres.map(genre => genre.name).join(' ')
        : genres
            .map(genre => genre.name)
            .slice(0, 2)
            .join(' ') + ' Other',
    id,
    voteAverage: vote_average.toFixed(1) * 10,
    overview,
    releaseDate: release_date.slice(0, 4),
  };

  function handleClick() {
    navigate(-1);
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Go back
      </button>
      {movieById && (
        <>
          <div className="movieById__container">
            {movieSort.posterPath === 'https://image.tmdb.org/t/p/w500null' ? (
              <img
                className="poster__foto"
                src={`https://www.restorixhealth.com/wp-content/uploads/2018/08/No-Image.png`}
                alt={title}
              />
            ) : (
              <img
                className="poster__foto"
                src={movieSort.posterPath}
                alt={title}
              />
            )}
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
          <div className='movie__info'>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to={`/movies/${movieSort.id}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieSort.id}/reviews`}>Reviews</Link>
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
