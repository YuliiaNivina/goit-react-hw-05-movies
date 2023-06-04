import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    getMovies
      .fetchMovieReviews(movieId)
      .then(setReviews)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <div>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
