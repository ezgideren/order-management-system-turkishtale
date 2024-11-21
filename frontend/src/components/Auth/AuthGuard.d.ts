import * as React from 'react';
interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: 'primary_server' | 'secondary_server' | 'kitchen_staff';
    loadingMessage?: string;
    unauthorizedMessage?: string;
    onUnauthorized?: () => void;
}
export declare const AuthGuard: ({ children, requiredRole, loadingMessage, unauthorizedMessage, onUnauthorized }: AuthGuardProps) => import("react/jsx-runtime").JSX.Element;
export default AuthGuard;
