import axios from "axios";

// Create axios instance
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

// Attach token dynamically before every request
apiAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get the latest token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});
