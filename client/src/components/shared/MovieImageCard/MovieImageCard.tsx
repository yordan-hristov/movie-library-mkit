import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './MovieImageCard.scss';

type MovieImageCardProps = {
  imageUrl: string;
  movieId: string;
}

const MovieImageCard = ({imageUrl, movieId}:  MovieImageCardProps) => {
  return <div className='movie-image-card'>
      <Link to={`/movies/${movieId}`}><img src={imageUrl}></img></Link>
  </div>;
};

export default MovieImageCard;
