const DEBUG = true;
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'http://localhost:8080';

const JWT_KEY = 'FITOOR_JWT';
const getJWT = () => localStorage.getItem(JWT_KEY);
const delJWT = () => localStorage.removeItem(JWT_KEY);
const setJWT = (JWT: string) => localStorage.setItem(JWT_KEY, JWT);

const headers = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJWT()}`
    }
}

const fetchPost = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/api/getPost?postId=${postId}`, {
        method: 'GET'
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: 'Random error'}
    }
}

const deletePost = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/api/deletePost?postId=${postId}`, {
        method: 'DELETE'
    });
    
    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: 'Random error'}
    }
    
}

const fetchPosts = async (skip: number, limit: number) => {
    const res = await fetch(`${BASE_URL}/api/getPosts?skip=${skip}&limit=${limit}`, {
      method: 'GET',
      headers: headers()
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return { error: true, message: res }
    }
}



export { fetchPosts, fetchPost, deletePost };