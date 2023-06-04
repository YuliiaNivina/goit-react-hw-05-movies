import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    getMovies
      .fetchMovieCast(movieId)
      .then(setCast)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  const defaultImg = `https://www.restorixhealth.com/wp-content/uploads/2018/08/No-Image.png`;

  return (
    <>
      {error && <p>Whoops, something went wrong: {error}</p>}
      {isLoading && <p>Loading...</p>}
      {(cast.length > 0) ? (
        <ul>
          {cast.map(({ profile_path, name, id, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImg
                }
                alt={name}
                width="100"
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any cast for this movie.</p>
      )}
    </>
  );
};

export default Cast;
