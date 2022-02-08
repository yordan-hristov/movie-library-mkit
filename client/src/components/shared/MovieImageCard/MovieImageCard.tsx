import React from 'react';

import './MovieImageCard.scss';

type MovieImageCardProps = {
  imageUrl: string;
}

const MovieImageCard = ({imageUrl}:  MovieImageCardProps) => {
  return <div className='movie-image-card'>
      <img src={imageUrl}></img>
  </div>;
};

export default MovieImageCard;
