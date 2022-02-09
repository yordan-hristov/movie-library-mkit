import React from 'react';
import { Link } from 'react-router-dom';

import './HeroSection.scss';

const HeroSection = () => {
    return <section className='hero-section'>
        <h1 className="hero-section-heading">My Movie Library</h1>
        <p className="hero-section-text">Manage and review your favorite movies</p>
        <Link to={'/search'}><button className="hero-section-button">Search</button></Link>
    </section>;
};

export default HeroSection;
