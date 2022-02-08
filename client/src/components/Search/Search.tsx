import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import SearchBar from '../shared/SearchBar/SearchBar';

import movieService from '../../services/movieService';
import { setSearchQuery } from '../../store/searchQuery/searchQuerySlice';

import './Search.scss';
import MovieInfo from '../MovieInfo/MovieInfo';
import { IMovie } from '../../interfaces/movie';

const Search = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: RootStateOrAny) => state.searchQuery);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            movieService.getMoviesWithQuery(searchQuery)
                .then(res => setMovies(res));
        }

        return () => {
            dispatch(setSearchQuery(''));
        }
    }, [searchQuery])

    return <div className='search'>
        <h1 className='search-heading'>Search</h1>
        <SearchBar shouldNavigate={false} />
        <div className="search-results">
            {movies.length > 0 && movies.map((m: IMovie) => {
                return <MovieInfo movie={m} key={m.id} />
            })}
        </div>
    </div>;
};

export default Search;
