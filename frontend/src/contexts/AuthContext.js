import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import api from '@/services/api';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const { data } = await api.get('/auth/verify');
                    if (data.user) {
                        setUser(data.user);
                    }
                }
                catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initializeAuth().catch(console.error);
    }, []);
    const login = async (username, password) => {
        try {
            setError(null);
            setLoading(true);
            const { data } = await api.get('/auth/verify');
            await api.post('/auth/login', { username, password });
            if (!data.success) {
                throw new Error(data.message || 'Login failed');
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.user) {
                setUser(data.user);
            }
            toast({
                title: "Success",
                description: "Logged in successfully",
            });
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            setUser(null);
            toast({
                title: "Success",
                description: "Logged out successfully",
            });
            window.location.href = '/login';
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        }
    };
    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        error
    };
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
