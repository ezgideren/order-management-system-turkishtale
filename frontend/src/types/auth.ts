export type UserRole = 'hale' | 'servis' | 'kitchen';

export interface BaseUser {
    id: string;
    username: string;
    fullName: string;
    role: UserRole;
    email?: string;
}

export interface UserPermissions {
    hale: ['view_orders', 'create_orders', 'edit_orders'];
    servis: ['view_orders', 'update_order_status'];
    kitchen: ['view_orders', 'update_order_status', 'manage_inventory'];
}

export interface User extends BaseUser {
    permissions: UserPermissions[UserRole];
    lastLogin?: Date;
    isActive: boolean;
}

export interface LoginCredentials {
    username: string;
    password: string;
    remember?: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    expiresAt?: number;
}

export interface AuthError {
    code: 'INVALID_CREDENTIALS' | 'ACCOUNT_DISABLED' | 'SESSION_EXPIRED';
    message: string;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    message?: string;
}
