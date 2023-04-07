const emoji = require("emoji-dictionary");

// const DEBUG = process.env.DEBUG || false;
const DEBUG = false;
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'https://fitoor-backend.vercel.app';

const JWT_KEY = 'FITOOR_JWT';
const getJWT = () => localStorage.getItem(JWT_KEY);
const delJWT = () => localStorage.removeItem(JWT_KEY);
const setJWT = (JWT: string) => localStorage.setItem(JWT_KEY, JWT);

const GOOGLE_RECAPTCHA_SITE_KEY='6LdwrmolAAAAAIXfZLAzPrOmYfVamVAcsbd7iaRv';

const headers = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJWT()}`
    }
}

const checkJWT = () => {
    return getJWT() !== null;
}

const fetchPost = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/api/getPost?postId=${postId}`, {
        method: 'GET',
        headers: headers()
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: 'Random error' }
    }
}

const fetchPublicPost = async (username: string, postId: string) => {
    const res = await fetch(`${BASE_URL}/api/getPublicPost?username=${username}&postId=${postId}`, {
        method: 'GET',
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: 'Random error' }
    }

}

const deletePost = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/api/deletePost?postId=${postId}`, {
        method: 'DELETE',
        headers: headers()
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: 'Random error' }
    }

}

const createNewPost = async (postData: string, disableComments: boolean, isPrivatePost: boolean) => {
    const res: any = await fetch(`${BASE_URL}/api/createPost`, {
        method: 'POST',
        body: JSON.stringify({ raw: postData, commentsEnabled: !disableComments, isPrivate: isPrivatePost }),
        headers: headers()
    });

    if (res.status === 201) {
        return { error: false, message: await res.json() }
    } else {
        return { error: true, message: await res.json() };
    }
}

const fetchPublicPosts = async (username: string, skip: number, limit: number) => {
    const res = await fetch(`${BASE_URL}/api/getPublicPosts?username=${username}&skip=${skip}&limi=${limit}`, {
        method: 'GET',
        headers: headers()
    });

    if (res.status === 200) {
        return { error: false, message: await res.json() };
    } else {
        return { error: true, message: await res.json() };
    }
}

const fetchPosts = async (skip: number, limit: number) => {
    const res = await fetch(`${BASE_URL}/api/getPosts?skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: headers()
    });

    if (res.status === 200) {
        return { error: false, message: await res.json() };
    } else {
        return { error: true, message: await res.json() }
    }
}

const fetchComments = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/comment/getMany?postId=${postId}`, {
        method: 'GET',
        headers: headers()
    });

    if (res.status === 200) {
        return { error: false, message: await res.json() };
    } else {
        return { error: true, message: await res.json() }
    }
}

const parseEmoji = (text: string) => {
    return text.replace(/:\w+:/gi, (match) => {
        const emojiName = match.slice(1, -1);

        return emoji.getUnicode(emojiName) || match;
    })
}

async function getUserProfile() {
    const res = await fetch(`${BASE_URL}/auth/userProfile`, {
        method: 'GET',
        headers: headers()
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
        return { error: false, message: data };
    } else if (res.status === 401) {
        return { error: true, message: "User unauthorized" };
    } else {
        return { error: true, message: res };
    }
}

async function logout() {
    delJWT();
    window.location.href = '/login';
}

async function loginUser(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/loginUser`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ email, password })
    });

    if (res.status === 201) {
        const data = await res.json();
        setJWT(data['access_token']);
        return { error: false, message: data.message };
    } else if (res.status === 401) { // unauthorized
        const data = await res.json();
        return { error: true, message: data.message };
    } else {
        const data = await res.json();
        return { error: true, message: data.message };
    }
}

async function createNewUser(username: string, email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/createUser`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ username: username, email: email, password: password })
    });

    if (res.status === 201) {
        const data = await res.json();
        return { error: false, message: data.message };
    } else if (res.status === 400) {
        const data = await res.json();
        return { error: true, message: data.message };
    } else {
        const data = await res.json();
        return { error: true, message: data.message };
    }
}

async function createNewComment(postId: string, email: string, text: string, nickname: string, captchaToken: string) {
    const res = await fetch(`${BASE_URL}/comment/create`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            postId: postId,
            email: email,
            text: text,
            nickname: nickname,
            captchaToken: captchaToken
        })
    });

    if (res.status === 201) {
        const data = await res.json();
        return { error: false, message: data.message };
    } else if (res.status === 400) {
        const data = await res.json();
        return { error: true, message: data.message };
    } else {
        const data = await res.json();
        return { error: true, message: data.message };
    }
}

export { fetchPosts, createNewUser, createNewComment, fetchPost, deletePost, parseEmoji, checkJWT, getUserProfile, loginUser, logout, createNewPost, fetchPublicPosts, fetchPublicPost, fetchComments, GOOGLE_RECAPTCHA_SITE_KEY };