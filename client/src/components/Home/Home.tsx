import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { IUserFavorites } from '../../interfaces/userFavorites';
import MovieImageCard from '../shared/MovieImageCard/MovieImageCard';
import HeroSection from './HeroSection/HeroSection';

import './Home.scss';

const Home = () => {
  const { favorites } = useSelector((state: RootStateOrAny) => state.user.user);

  return <div className='home'>
    <HeroSection />
    <h1 className="home-heading">My Favorites</h1>
    <div className="home-movies">
      {favorites.length > 0 ?
        favorites.map((m: IUserFavorites) => {
          return <MovieImageCard
            key={m.movieId}
            imageUrl={m.imageUrl}
            movieId={m.movieId}
          />
        }) :
        <p>No favorites yet...</p>}
    </div>
  </div>;
};

export default Home;
