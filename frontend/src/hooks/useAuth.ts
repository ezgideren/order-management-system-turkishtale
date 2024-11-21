import { useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials, AuthResponse } from '@/types/auth';
import api from '@/services/api';
import { AxiosResponse } from 'axios';

export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        accessToken: null
    });

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const { data } = await api.get<any, AxiosResponse<AuthResponse>>('/auth/verify');
                if (data.success) {
                    setState({
                        isAuthenticated: true,
                        user: data.user,
                        accessToken: data.accessToken
                    });
                }
            } catch {
                setState({
                    isAuthenticated: false,
                    user: null,
                    accessToken: null
                });
            }
        };

        verifyAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const { data } = await api.post<any, AxiosResponse<AuthResponse>>('/auth/login', credentials);
        if (!data.success) {
            throw new Error('Authentication failed');
        }
        localStorage.setItem('token', data.accessToken);
        setState({
            isAuthenticated: true,
            user: data.user,
            accessToken: data.accessToken
        });
    };

    const logout = async () => {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        setState({
            isAuthenticated: false,
            user: null,
            accessToken: null
        });
    };

    return { ...state, login, logout };
};