const serverUrl = 'http://localhost:5000/users';

const urls = {
    register: `${serverUrl}/register`,
    login: `${serverUrl}/login`,
}

const registerUser = async (email: string,password: string) => {
    const res = await fetch(urls.register,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    return data;
}

const loginUser = async (email: string,password: string) => {
    const res = await fetch(urls.login,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    return data;
}

export default {
    registerUser,
    loginUser
}