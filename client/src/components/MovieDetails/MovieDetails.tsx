import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IMovie } from '../../interfaces/movie';
import movieService from '../../services/movieService';
import { getUserRatings } from '../../store/user/userSlice';
import MovieInfo from '../MovieInfo/MovieInfo';

import './MovieDetails.scss';
import StarsRating from './StarsRating/StarsRating';

type UserRating = {
    movieId: string,
    rating: string
}

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { _id, ratings } = useSelector((state: RootStateOrAny) => state.user.user);
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovie>();

    useEffect(() => {
        movieService.getMovieById(id!)
            .then(res => setMovie(res));

        return () => {
            dispatch(getUserRatings(_id));
        }
    }, [])

    return <div className='movie-details'>
        {movie &&
            <>
                <MovieInfo movie={movie!} />
                <h1 className='movie-details-heading'>Your Review</h1>
                <StarsRating
                    rating={ratings.find((r: UserRating) => r.movieId == id)?.rating}
                    movieId={id!}
                    userId={_id}
                />
            </>
        }
    </div>;
};

export default MovieDetails;
