import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { IMovie } from '../../interfaces/movie';
import { IUserFavorites } from '../../interfaces/userFavorites';
import userService from '../../services/userService';
import { getUserFavorites } from '../../store/user/userSlice';
import MovieImageCard from '../shared/MovieImageCard/MovieImageCard';

import './MovieInfo.scss';

type MovieInfoProps = {
    movie: IMovie
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    const dispatch = useDispatch();
    const { _id,favorites } = useSelector((state: RootStateOrAny) => state.user.user);

    const handleClick = async () => {
        await userService.updateUserFavorites(_id,{id: movie.id, imageUrl: movie.image});
        dispatch(getUserFavorites(_id));
    }

    return <div className='movie-info'>
        <div className="movie-info-image">
            <MovieImageCard imageUrl={movie.image} movieId={movie.id}/>
        </div>
        <div className="movie-info-right">
            <h1 className="movie-info-title">{movie.title} <span>{`(${movie.year.split('-')[0]})`}</span></h1>
            <p className="movie-info-genres">{`${movie.genres.join(', ')} | `}<span>{movie.runtime}</span></p>
            <p className="movie-info-summary">{movie.summary}</p>
            <a href={movie.url} target="_blank" className="movie-info-link">Visit official site</a>
            {
                favorites.some((m: IUserFavorites) => m.movieId == movie.id) ?
                    <button className="movie-info-button" style={{color: 'red'}} onClick={handleClick}>Remove from Favorites</button> :
                    <button className="movie-info-button" style={{color: 'green'}} onClick={handleClick}>Add to Favorites</button>
            }
        </div>
    </div>;
};

export default MovieInfo;
