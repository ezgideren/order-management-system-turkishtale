import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import LoginPage from './pages/auth/LoginPage';
import { useAuthContext } from '@/contexts/AuthContext';
const Routes = () => {
    const { isAuthenticated, loading } = useAuthContext();
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs(RouterRoutes, { children: [_jsx(Route, { path: "/login", element: isAuthenticated ? (_jsx(Navigate, { to: "/", replace: true })) : (_jsx(LoginPage, {})) }), _jsx(Route, { path: "/", element: isAuthenticated ? (_jsx(Layout, {})) : (_jsx(Navigate, { to: "/login", replace: true })) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: isAuthenticated ? "/" : "/login", replace: true }) })] }));
};
export default Routes;
