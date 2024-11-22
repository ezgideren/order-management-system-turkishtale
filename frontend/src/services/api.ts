import axios from 'axios';

const BASE_URL = 'https://order-management-system-turkishtale-uudf.onrender.com';

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request debugging
api.interceptors.request.use(request => {
    console.log('Request:', {
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data
    });
    return request;
});

// Add response debugging
api.interceptors.response.use(
    response => {
        console.log('Response:', response.data);
        return response.data;
    },
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;