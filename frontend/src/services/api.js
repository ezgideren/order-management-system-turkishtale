import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://44.226.145.213:10000',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
api.interceptors.response.use((response) => response.data, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
});
export default api;
