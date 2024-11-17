// src/contexts/ApiContext.tsx
import React, { createContext, useContext } from 'react';
import axios from 'axios';

interface ApiContextType {
    api: {
        get: <T>(url: string) => Promise<T>;
        post: <T>(url: string, data: any) => Promise<T>;
        put: <T>(url: string, data: any) => Promise<T>;
        patch: <T>(url: string, data?: any) => Promise<T>;
        delete: (url: string) => Promise<void>;
    };
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const api = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error.response?.data || error);
        }
    );

    const value = {
        api: {
            get: <T,>(url: string) => api.get<T>(url),
            post: <T,>(url: string, data: any) => api.post<T>(url, data),
            put: <T,>(url: string, data: any) => api.put<T>(url, data),
            patch: <T,>(url: string, data?: any) => api.patch<T>(url, data),
            delete: (url: string) => api.delete(url),
        },
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};