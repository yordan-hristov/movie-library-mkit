import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../shared/SearchBar/SearchBar';

import './NavBar.scss';

const NavBar = () => {
  return <nav className="nav-bar">
      <Link to={'/home'}><h1 className="nav-bar-title">My Movie Collection</h1></Link>
      <SearchBar shouldNavigate={true} />
  </nav>
};

export default NavBar;
