const serverUrl = 'http://localhost:5000/movies';

const urls = {
    getWithQuery: (title: string) => `${serverUrl}?title=${title}`,
    getById: (id: string) => `${serverUrl}/${id}`
};

const getMoviesWithQuery = async (title: string) => {
    const res = await fetch(urls.getWithQuery(title));
    const {success, data} = await res.json();
    
    if(success) return data;
};

const getMovieById = async (id: string) => {
    const res = await fetch(urls.getById(id));
    const {success, data} = await res.json();

    if(success) return data;
}

export default {
    getMoviesWithQuery,
    getMovieById
};