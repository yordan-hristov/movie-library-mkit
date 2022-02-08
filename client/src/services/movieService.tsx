const serverUrl = 'http://localhost:5000/movies';

const urls = {
    getWithQuery: (title: string) => `${serverUrl}?title=${title}`,
    getById: (id: string) => `${serverUrl}/${id}`
};

const getMoviesWithQuery = async (title: string) => {
    const res = await fetch(urls.getWithQuery(title));
    const movies = await res.json();
    
    return movies;
};

const getMovieById = async (id: string) => {
    const res = await fetch(urls.getById(id));
    const movie = await res.json();

    return movie;
}

export default {
    getMoviesWithQuery,
    getMovieById
};