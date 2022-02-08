import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMovie } from '../../interfaces/movie';
import movieService from '../../services/movieService';
import MovieInfo from '../MovieInfo/MovieInfo';

import './MovieDetails.scss';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovie>();

    useEffect(() => {
        movieService.getMovieById(id!)
            .then(res => setMovie(res));
    })

    return <div className='movie-details'>
        {movie &&
            <MovieInfo movie={movie!} />
        }
    </div>;
};

export default MovieDetails;
