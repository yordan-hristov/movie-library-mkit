import React, { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../../../store/searchQuery/searchQuerySlice';

import './SearchBar.scss'

type SearchBarProps = {
  shouldNavigate: boolean;
}

const SearchBar = ({ shouldNavigate }: SearchBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');

  const handleClick = () => {
    dispatch(setSearchQuery(movieTitle));
    shouldNavigate && navigate('/search');
  }

  return <div className='search-bar'>
    <input type="text" className="search-bar-input" placeholder='Search by movie title...' onChange={(e) => setMovieTitle(e.target.value)} />
    <button className="search-bar-button" onClick={handleClick}>Search</button>
  </div>;
};

export default SearchBar;
