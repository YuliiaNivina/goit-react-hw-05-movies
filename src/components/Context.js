import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const ContextMovie = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, searchMovies, setSearchMovies }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
