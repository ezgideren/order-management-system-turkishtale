import * as React from 'react';
import {useState, useEffect} from "react";
import {Alert, AlertDescription} from "../ui/alert";

// Auth hook with real JWT integration
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);

    return { isAuthenticated, isLoading, user };
};

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: 'primary_server' | 'secondary_server' | 'kitchen_staff';
    loadingMessage?: string;
    unauthorizedMessage?: string;
    onUnauthorized?: () => void;
}

export const AuthGuard = ({
                              children,
                              requiredRole,
                              loadingMessage = 'Verifying access...',
                              unauthorizedMessage = 'Please log in to access this page',
                              onUnauthorized
                          }: AuthGuardProps) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || (requiredRole && user?.role !== requiredRole))) {
            setShowError(true);
            onUnauthorized?.();
            const timer = setTimeout(() => setShowError(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, isAuthenticated, user, requiredRole, onUnauthorized]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
                <p className="text-sm text-gray-600">{loadingMessage}</p>
            </div>
        );
    }

    if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
        return (
            <div className="fixed top-4 right-4 z-50">
                <Alert variant="destructive">
                    <AlertDescription>
                        {!isAuthenticated ? unauthorizedMessage : 'Insufficient permissions'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;