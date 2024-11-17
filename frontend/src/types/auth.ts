export interface User {
    id: string;
    username: string;
    fullName: string;
    role: 'primary_server' | 'secondary_server' | 'kitchen_staff';
    email?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
}