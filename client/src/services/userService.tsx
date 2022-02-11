const serverUrl = 'http://localhost:5000/users';

const urls = {
    register: `${serverUrl}/register`,
    login: `${serverUrl}/login`,
    getFavorites: (id: string) => `${serverUrl}/${id}/favorites`,
    updateFavorites: (id: string) => `${serverUrl}/${id}/favorites`,
    getRatings: (id: string) => `${serverUrl}/${id}/ratings`,
    updateRatings: (id: string) => `${serverUrl}/${id}/ratings`,
    createNote: (id: string) => `${serverUrl}/${id}/notes`,
    getNotes: (id: string) => `${serverUrl}/${id}/notes`,
    deleteNote: (id: string, noteId: string) => `${serverUrl}/${id}/notes/${noteId}`
}

const registerUser = async (email: string, password: string) => {
    const res = await fetch(urls.register, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    return data;
}

const loginUser = async (email: string, password: string) => {
    const res = await fetch(urls.login, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    return data;
}

const getUserFavorites = async (userId: string) => {
    const res = await fetch(urls.getFavorites(userId));
    const {success, data} = await res.json();

    if(success) return data;
}

const updateUserFavorites = async (userId: string, movie: { id: string, imageUrl: string }) => {
    const res = await fetch(urls.updateFavorites(userId), {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({movie})
    });

    const {success, message} = await res.json();

    if(success) return message;
}

const getUserRatings = async (userId: string) => {
    const res = await fetch(urls.getRatings(userId));
    const {success, data} = await res.json();

    if(success) return data;
}

const updateUserRatings = async (userId: string, rating: { movieId: string, rating: string }) => {
    const res = await fetch(urls.updateRatings(userId), {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rating})
    });

    const {success, message} = await res.json();

    if(success) return message;
}

const getUserNotes = async (userId: string) => {
    const res = await fetch(urls.getNotes(userId));
    const {success, data} = await res.json();

    if(success) return data;
}

const createNote = async (userId: string, movieId: string, note: string) => {
    const res = await fetch(urls.createNote(userId), {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId, note })
    });

    const {success, message} = await res.json();
    if(success) return message;
}

const deleteNote = async (userId: string, noteId: string) => {
    const res = await fetch(urls.deleteNote(userId, noteId), {
        method: "DELETE"
    });

    const {success, message} = await res.json();

    if(success) return message;
}

export default {
    registerUser,
    loginUser,
    getUserFavorites,
    updateUserFavorites,
    getUserRatings,
    updateUserRatings,
    createNote,
    getUserNotes,
    deleteNote
}