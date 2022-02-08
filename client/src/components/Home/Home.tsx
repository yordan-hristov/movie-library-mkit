import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { IUserFavorites } from '../../interfaces/userFavorites';
import MovieImageCard from '../shared/MovieImageCard/MovieImageCard';
import HeroSection from './HeroSection/HeroSection';

import './Home.scss';
import NavBar from './NavBar/NavBar';

const Home = () => {
  const { favorites } = useSelector((state: RootStateOrAny) => state.user.user);

  return <div className='home'>
    <NavBar />
    <HeroSection />
    <h1 className="home-heading">My Favorites</h1>
    <div className="home-movies">
      {favorites.map((m: IUserFavorites) => {
        return <MovieImageCard key={m.movieId} imageUrl={m.imageUrl} />
      })}
    </div>
  </div>;
};

export default Home;
