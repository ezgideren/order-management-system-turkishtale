import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import api from '@/services/api';
import { AxiosResponse } from 'axios';

interface User {
    id: string;
    username: string;
    role: string;
}

interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: User;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get<AuthResponse>('/auth/verify');
                    if (data.user) {
                        setUser(data.user);
                    }
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const { data } = await api.post<AuthResponse>('/auth/login', { username, password });

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
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post<AuthResponse>('/auth/logout');
            localStorage.removeItem('token');
            setUser(null);
            toast({
                title: "Success",
                description: "Logged out successfully",
            });
            window.location.href = '/login';
        } catch (err) {
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
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};