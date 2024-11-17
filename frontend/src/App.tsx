// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ApiProvider } from './contexts/ApiContext';
import { Toaster } from "@/components/ui/toaster";
import Routes from './Routes';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ApiProvider>
                    <AppProvider>
                        <Routes />
                        <Toaster />
                    </AppProvider>
                </ApiProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;