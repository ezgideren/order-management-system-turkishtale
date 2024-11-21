import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/Routes.tsx
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import LoginPage from './pages/auth/LoginPage';
import { useAuthContext } from '@/contexts/AuthContext';
const Routes = () => {
    const { isAuthenticated } = useAuthContext();
    return (_jsxs(RouterRoutes, { children: [_jsx(Route, { path: "/login", element: isAuthenticated ? (_jsx(Navigate, { to: "/dashboard", replace: true })) : (_jsx(LoginPage, {})) }), _jsx(Route, { path: "/dashboard", element: isAuthenticated ? (_jsx(Layout, {})) : (_jsx(Navigate, { to: "/login", replace: true })) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: isAuthenticated ? "/dashboard" : "/login", replace: true }) })] }));
};
export default Routes;
