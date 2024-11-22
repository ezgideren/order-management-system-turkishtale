import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "../ui/alert";
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
                const response = await fetch('/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                }
                else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            }
            catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
            }
            finally {
                setIsLoading(false);
            }
        };
        verifyToken();
    }, []);
    return { isAuthenticated, isLoading, user };
};
export const AuthGuard = ({ children, requiredRole, loadingMessage = 'Verifying access...', unauthorizedMessage = 'Please log in to access this page', onUnauthorized }) => {
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
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen gap-4", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" }), _jsx("p", { className: "text-sm text-gray-600", children: loadingMessage })] }));
    }
    if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
        return (_jsx("div", { className: "fixed top-4 right-4 z-50", children: _jsx(Alert, { variant: "destructive", children: _jsx(AlertDescription, { children: !isAuthenticated ? unauthorizedMessage : 'Insufficient permissions' }) }) }));
    }
    return _jsx(_Fragment, { children: children });
};
export default AuthGuard;
