import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ApiProvider } from './contexts/ApiContext';
import { Toaster } from "@/components/ui/toaster";
import Routes from './Routes';
const App = () => {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(ApiProvider, { children: _jsxs(AppProvider, { children: [_jsx(Routes, {}), _jsx(Toaster, {})] }) }) }) }));
};
export default App;
