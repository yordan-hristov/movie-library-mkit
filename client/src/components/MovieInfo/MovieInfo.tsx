import React from 'react';
import { IMovie } from '../../interfaces/movie';
import MovieImageCard from '../shared/MovieImageCard/MovieImageCard';

import './MovieInfo.scss';

type MovieInfoProps = {
    movie: IMovie
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    return <div className='movie-info'>
        <div className="movie-info-image">
            <MovieImageCard imageUrl={movie.image}/>
        </div>
        <div className="movie-info-right">
            <h1 className="movie-info-title">{movie.title} <span>{`(${movie.year.split('-')[0]})`}</span></h1>
            <p className="movie-info-genres">{`${movie.genres.join(', ')} | `}<span>{movie.runtime}</span></p>
            <p className="movie-info-summary">{movie.summary}</p>
            <a href={movie.url} target="_blank" className="movie-info-link">Visit official site</a>
            <button className="movie-info-button">Favorite</button>
        </div>
    </div>;
};

export default MovieInfo;
