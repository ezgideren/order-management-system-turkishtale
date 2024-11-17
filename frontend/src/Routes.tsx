// src/Routes.tsx
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import LoginPage from './pages/auth/LoginPage';
import { useAuthContext } from '@/contexts/AuthContext';

const Routes = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <RouterRoutes>
            <Route
                path="/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <LoginPage />
                    )
                }
            />
            <Route
                path="/dashboard"
                element={
                    isAuthenticated ? (
                        <Layout />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path="/"
                element={
                    <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
                }
            />
        </RouterRoutes>
    );
};

export default Routes;