// src/services/api.ts
import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '44.226.145.213/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor
api.interceptors.response.use((response) => response.data, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
});
export default api;
