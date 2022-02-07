import React from 'react';
import MovieImageCard from '../shared/MovieImageCard/MovieImageCard';
import HeroSection from './HeroSection/HeroSection';

import './Home.scss';
import NavBar from './NavBar/NavBar';

const Home = () => {
  return <div className='home'>
    <NavBar />
    <HeroSection />
    <h1 className="home-heading">My Favorites</h1>
    <div className="home-movies">
      <MovieImageCard />
      <MovieImageCard />
      <MovieImageCard />
      <MovieImageCard />
      <MovieImageCard />
      <MovieImageCard />
      <MovieImageCard />
    </div>
  </div>;
};

export default Home;
