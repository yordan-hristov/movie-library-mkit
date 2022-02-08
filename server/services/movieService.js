import fetch from 'node-fetch';

export const getMoviesWithQuery = async (title) => {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${title}`);
    const resMovies = await res.json();
    const movies = resMovies.map(({ show }) => {
        return {
            id: show.id,
            title: show.name || '',
            year: show.premiered || '',
            genres: show.genres || [],
            runtime: show.runtime || '',
            summary: show.summary || '',
            url: show.url || '',
            image: show.image?.original || ''
        }
    });
    return movies;
};

export const getMovieById = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const resMovie = await res.json();
    const movie = {
        id: resMovie.id,
        title: resMovie.name || '',
        year: resMovie.premiered || '',
        genres: resMovie.genres || [],
        runtime: resMovie.runtime || '',
        summary: resMovie.summary || '',
        url: resMovie.url || '',
        image: resMovie.image?.original || ''
    };

    return movie;
}

