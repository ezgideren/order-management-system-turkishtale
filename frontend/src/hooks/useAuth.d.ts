import { LoginCredentials } from '@/types/auth';
export declare const useAuth: () => {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    user: import("@/types/auth").User | null;
    accessToken: string | null;
    expiresAt?: number;
};
