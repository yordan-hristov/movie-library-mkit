import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchQuery } from '../../../store/searchQuery/searchQuerySlice';
import { removeUser } from '../../../store/user/userSlice';

import './HeroSection.scss';

const HeroSection = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(removeUser());
        dispatch(setSearchQuery(''));
    }

    return <section className='hero-section'>
        <h1 className="hero-section-heading">My Movie Library</h1>
        <p className="hero-section-text">Manage and review your favorite movies</p>
        <Link to={'/search'}><button className="hero-section-button">Search</button></Link>
        <div className="logout" onClick={handleClick}>Logout</div>
    </section>;
};

export default HeroSection;
