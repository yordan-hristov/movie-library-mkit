import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import SearchBar from '../shared/SearchBar/SearchBar';

import movieService from '../../services/movieService';
import { setSearchQuery } from '../../store/searchQuery/searchQuerySlice';

import './Search.scss';

const Search = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: RootStateOrAny) => state.searchQuery);
    const [movies, setMovies] = useState();

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
    </div>;
};

export default Search;
