const serverUrl = 'http://localhost:5000/users';

const urls = {
    register: `${serverUrl}/register`,
    login: `${serverUrl}/login`,
    getFavorites: (id: string) => `${serverUrl}/${id}/favorites`,
    updateFavorites: (id: string) => `${serverUrl}/${id}/favorites`,
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
    const data = await res.json();

    return data;
}

const updateUserFavorites = async (userId: string, movie: { id: string, imageUrl: string }) => {
    await fetch(urls.updateFavorites(userId), {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, movie })
    })
}

export default {
    registerUser,
    loginUser,
    getUserFavorites,
    updateUserFavorites
}