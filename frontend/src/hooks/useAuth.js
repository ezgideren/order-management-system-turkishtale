import { useState, useEffect } from 'react';
export const useAuth = () => {
    const [state, setState] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null
    });
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await fetch('/api/auth/verify', {
                    credentials: 'include'
                });
                const data = await res.json();
                setState({
                    isAuthenticated: res.ok,
                    user: res.ok ? data.user : null,
                    accessToken: res.ok ? data.accessToken : null
                });
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
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) {
            throw new Error('Authentication failed');
        }
        const data = await res.json();
        setState({
            isAuthenticated: true,
            user: data.user,
            accessToken: data.accessToken
        });
    };
    const logout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setState({
            isAuthenticated: false,
            user: null,
            accessToken: null
        });
    };
    return { ...state, login, logout };
};
