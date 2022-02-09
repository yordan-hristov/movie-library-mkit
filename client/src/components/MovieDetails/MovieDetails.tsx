import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IMovie } from '../../interfaces/movie';
import movieService from '../../services/movieService';
import { getUserRatings } from '../../store/user/userSlice';
import MovieInfo from '../MovieInfo/MovieInfo';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

import './MovieDetails.scss';
import Notes from './Notes/Notes';
import StarsRating from './StarsRating/StarsRating';

type UserRating = {
    movieId: string,
    rating: string
}

type UserNote = {
    movieId: string;
    note: string;
}

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { _id, ratings, notes } = useSelector((state: RootStateOrAny) => state.user.user);
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovie>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        movieService.getMovieById(id!)
            .then(res => setMovie(res))
            .finally(() => setLoading(false));

        return () => {
            dispatch(getUserRatings(_id));
        }
    }, [])

    return <div className='movie-details'>
        {!loading ?
            <>
                <MovieInfo movie={movie!} />
                <h1 className='movie-details-heading'>Your Review</h1>
                <StarsRating
                    rating={ratings.find((r: UserRating) => r.movieId == id)?.rating}
                    movieId={id!}
                    userId={_id}
                />
                <Notes
                    notes={notes.filter((n: UserNote) => n.movieId == id)}
                    movieId={id!}
                    userId={_id}
                />
            </> :
            <LoadingSpinner />
        }
    </div>;
};

export default MovieDetails;
