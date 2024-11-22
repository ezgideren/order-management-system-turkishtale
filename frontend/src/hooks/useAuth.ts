import { useState} from 'react';
import { AuthState, LoginCredentials, AuthResponse } from '@/types/auth';
import api from '@/services/api';

export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        accessToken: null
    });

    const login = async (credentials: LoginCredentials) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || 'Authentication failed');
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        setState({
            isAuthenticated: true,
            user: data.user || null,
            accessToken: data.token || null
        });
    };

    const verifyAuth = async () => {
        try {
            const response = await api.get<AuthResponse>('/auth/verify');
            const data = response.data;

            setState({
                isAuthenticated: true,
                user: data.user || null,
                accessToken: data.token || null
            });
        } catch (error) {
            setState({
                isAuthenticated: false,
                user: null,
                accessToken: null
            });
        }
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