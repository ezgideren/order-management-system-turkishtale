import { useState, useEffect } from 'react';
import api from '@/services/api';
export const useAuth = () => {
    const [state, setState] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null
    });
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const { data } = await api.get('/auth/verify');
                if (data.success) {
                    setState({
                        isAuthenticated: true,
                        user: data.user,
                        accessToken: data.accessToken
                    });
                }
            }
            catch {
                setState({
                    isAuthenticated: false,
                    user: null,
                    accessToken: null
                });
            }
        };
        verifyAuth();
    }, []);
    const login = async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
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
