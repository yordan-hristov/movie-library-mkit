import fetch from 'node-fetch';

export const getMoviesWithQuery = async (title) => {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${title}`);
    const resMovies = await res.json();
    const movies = resMovies.map(({show}) => {
        return {
            title: show.name,
            year: show.premiered,
            genres: show.genres,
            runtime: show.runtime,
            summary: show.summary,
            url: show.url,
            image: show.image.original
        }
    });
    return movies;
};

