import { useState, useCallback } from 'react';
import { LoginCredentials, User, AuthState } from '@/types/auth';

// Simulated user data - replace with actual API calls
const MOCK_USERS = [
    {
        id: '1',
        username: 'servis',
        password: 'password123',
        fullName: 'Servis Manager',
        role: 'primary_server' as const,
    },
    {
        id: '2',
        username: 'kitchen',
        password: 'password123',
        fullName: 'Kitchen Staff',
        role: 'kitchen_staff' as const,
    }
];

export const useAuth = () => {
    const [state, setState] = useState<AuthState>(() => {
        // Check if there's an existing session in localStorage
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            try {
                return JSON.parse(savedAuth);
            } catch (e) {
                localStorage.removeItem('auth');
            }
        }
        return {
            isAuthenticated: false,
            user: null,
            accessToken: null
        };
    });

    const login = useCallback(async (credentials: LoginCredentials) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user (replace with actual API call)
        const user = MOCK_USERS.find(u =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Create auth state
        const authState: AuthState = {
            isAuthenticated: true,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                role: user.role
            },
            accessToken: 'mock-token-' + Math.random()
        };

        // Save to localStorage
        localStorage.setItem('auth', JSON.stringify(authState));

        // Update state
        setState(authState);
    }, []);

    const logout = useCallback(async () => {
        // Clear localStorage
        localStorage.removeItem('auth');

        // Reset state
        setState({
            isAuthenticated: false,
            user: null,
            accessToken: null
        });
    }, []);

    return {
        ...state,
        login,
        logout
    };
};