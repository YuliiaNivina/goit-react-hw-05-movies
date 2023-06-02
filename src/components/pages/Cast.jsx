import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovies.fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  if (!cast) {
    return <div>Loading cast...</div>;
  }

  if (cast.length === 0) {
    return <p>We don't have any cast for this movie.</p>;
  }

  return (
    <ul>
      {cast.map(({ profile_path, name, id, character }) => (
        <li key={id}>
          {profile_path ? (
            <img
              className="actor__foto"
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
            />
          ) : (
            <img
              className="actor__foto"
              src={`https://www.restorixhealth.com/wp-content/uploads/2018/08/No-Image.png`}
              alt={name}
            />
          )}
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
