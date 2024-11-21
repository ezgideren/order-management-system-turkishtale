import * as React from 'react';
import { createContext, useContext } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
    const API_URL = import.meta.env.VITE_API_URL || 'https://order-management-system-turkishtale.onrender.com';

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error.response?.data || error);
        }
    );

    const value: ApiContextType = {
        api: {
            get: <T,>(url: string): Promise<T> =>
                axiosInstance.get<T, AxiosResponse<T>>(url).then(response => response.data),
            post: <T,>(url: string, data: any): Promise<T> =>
                axiosInstance.post<T, AxiosResponse<T>>(url, data).then(response => response.data),
            put: <T,>(url: string, data: any): Promise<T> =>
                axiosInstance.put<T, AxiosResponse<T>>(url, data).then(response => response.data),
            patch: <T,>(url: string, data?: any): Promise<T> =>
                axiosInstance.patch<T, AxiosResponse<T>>(url, data).then(response => response.data),
            delete: (url: string): Promise<void> =>
                axiosInstance.delete(url).then(() => undefined),
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