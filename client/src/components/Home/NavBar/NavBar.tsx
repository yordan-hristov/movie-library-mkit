import React from 'react';
import SearchBar from '../../shared/SearchBar/SearchBar';

import './NavBar.scss';

const NavBar = () => {
  return <nav className="nav-bar">
      <h1 className="nav-bar-title">My Movie Collection</h1>
      <SearchBar />
  </nav>
};

export default NavBar;
