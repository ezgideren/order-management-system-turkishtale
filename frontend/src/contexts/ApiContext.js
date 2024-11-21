import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import axios from 'axios';
const ApiContext = createContext(undefined);
export const ApiProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL || '44.226.145.213';
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));
    axiosInstance.interceptors.response.use((response) => response.data, (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
    });
    const value = {
        api: {
            get: (url) => axiosInstance.get(url).then(response => response.data),
            post: (url, data) => axiosInstance.post(url, data).then(response => response.data),
            put: (url, data) => axiosInstance.put(url, data).then(response => response.data),
            patch: (url, data) => axiosInstance.patch(url, data).then(response => response.data),
            delete: (url) => axiosInstance.delete(url).then(() => undefined),
        },
    };
    return _jsx(ApiContext.Provider, { value: value, children: children });
};
export const useApi = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
