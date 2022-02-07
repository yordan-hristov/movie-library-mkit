import React from 'react';
import { Link } from 'react-router-dom';

import './HeroSection.scss';

const HeroSection = () => {
    return <section className='hero-section'>
        <h1 className="hero-section-heading">Heading</h1>
        <p className="hero-section-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, quam.</p>
        <Link to={'/search'}><button className="hero-section-button">Search</button></Link>
    </section>;
};

export default HeroSection;
