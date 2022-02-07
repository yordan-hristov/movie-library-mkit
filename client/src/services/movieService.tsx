const serverUrl = 'http://localhost:5000/movies';

const urls = {
    getWithQuery: (title: string) => `${serverUrl}?title=${title}`,
};

const getMoviesWithQuery = async (title: string) => {
    const res = await fetch(urls.getWithQuery(title));
    const movies = await res.json();
    
    return movies;
};

export default {
    getMoviesWithQuery,
};