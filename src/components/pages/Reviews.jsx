import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as getMovies from 'services/moviesApi';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getMovies.fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!reviews) {
    return <div>Loading кeviews...</div>;
  }

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  return (
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
  );
};

export default Reviews;
