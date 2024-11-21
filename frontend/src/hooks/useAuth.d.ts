import { User, LoginCredentials } from '@/types/auth';
export declare const useAuth: () => {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    expiresAt?: number;
};
