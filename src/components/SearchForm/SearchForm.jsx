import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ setSearchParams }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchParams({ query: searchQuery });
    setSearchQuery('');
  };

  return (
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
  );
};

export default SearchForm;

SearchForm.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
};
