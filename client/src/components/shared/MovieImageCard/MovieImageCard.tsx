import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './MovieImageCard.scss';

type MovieImageCardProps = {
  imageUrl: string;
  movieId: string;
}

const MovieImageCard = ({ imageUrl, movieId }: MovieImageCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return <div className='movie-image-card'>
    {!loaded && <LoadingSpinner />}
    <Link to={`/movies/${movieId}`}>
      <img
        src={imageUrl}
        onLoad={() => setLoaded(true)}
        style={loaded ? {} : {display: 'none'}}
      ></img>
    </Link>
  </div>;
};

export default MovieImageCard;
