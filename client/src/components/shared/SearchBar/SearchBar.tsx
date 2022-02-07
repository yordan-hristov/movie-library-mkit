import React from 'react';

import './SearchBar.scss'

const SearchBar = () => {
  return <div className='search-bar'>
      <input type="text" className="search-bar-input" placeholder='Search by movie title...'/>
      <button className="search-bar-button">Search</button>
  </div>;
};

export default SearchBar;
