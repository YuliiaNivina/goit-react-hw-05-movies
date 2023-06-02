import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../Context';
import * as getMovies from 'services/moviesApi';

const Movies = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  let { searchQuery, setSearchQuery, searchMovies, setSearchMovies } =
    useContext(SearchContext);

  useEffect(() => {
    if (isSubmitted) {
      getMovies.fetchMoviesBySearch(searchQuery).then(setSearchMovies);
      setIsSubmitted(false);
       setSearchQuery('');
    }
  }, [searchQuery, setSearchQuery, setSearchMovies, isSubmitted]);

  const handleChange = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    setIsSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="searchForm">
        <input
          className="search__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
      {searchMovies && (
        <ul className="imageGallery">
          {searchMovies.map(({ title, id }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
