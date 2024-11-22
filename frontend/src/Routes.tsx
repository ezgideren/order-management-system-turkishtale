import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import LoginPage from './pages/auth/LoginPage';
import { useAuthContext } from '@/contexts/AuthContext';

const Routes = () => {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <RouterRoutes>
            <Route
                path="/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/" replace />
                    ) : (
                        <LoginPage />
                    )
                }
            />
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Layout />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path="*"
                element={
                    <Navigate to={isAuthenticated ? "/" : "/login"} replace />
                }
            />
        </RouterRoutes>
    );
};

export default Routes;