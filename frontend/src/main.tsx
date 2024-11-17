import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>

            <AuthProvider>
                <AppProvider>
                    <App />
                </AppProvider>
            </AuthProvider>

    </React.StrictMode>
);