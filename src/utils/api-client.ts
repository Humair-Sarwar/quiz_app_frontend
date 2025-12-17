import axios from "axios";

let token = localStorage.getItem("token")

export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});