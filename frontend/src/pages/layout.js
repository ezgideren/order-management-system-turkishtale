import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuManagement } from '@/components/Menu/MenuManagement';
import { OrderManagement } from '@/components/Orders/OrderManagement';
import { TableManagement } from '@/components/Tables/TableManagement';
import { KitchenDisplay } from '@/components/Kitchen/KitchenDisplay';
const Layout = () => {
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    // Define available tabs based on user role
    const getAvailableTabs = () => {
        switch (user?.role) {
            case 'admin': // hale
                return [
                    { id: 'menu', label: 'Menu Management', component: _jsx(MenuManagement, {}) },
                    { id: 'orders', label: 'Orders', component: _jsx(OrderManagement, {}) },
                    { id: 'tables', label: 'Tables', component: _jsx(TableManagement, {}) },
                    { id: 'kitchen', label: 'Kitchen Display', component: _jsx(KitchenDisplay, {}) }
                ];
            case 'server': // servis
                return [
                    { id: 'orders', label: 'Orders', component: _jsx(OrderManagement, {}) },
                    { id: 'tables', label: 'Tables', component: _jsx(TableManagement, {}) }
                ];
            case 'kitchen': // kitchen
                return [
                    { id: 'kitchen', label: 'Kitchen Display', component: _jsx(KitchenDisplay, {}) }
                ];
            default:
                return [];
        }
    };
    const availableTabs = getAvailableTabs();
    const defaultTab = availableTabs[0]?.id;
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx("header", { className: "border-b", children: _jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("h1", { className: "text-xl font-bold", children: "Turkish Tale" }), user && (_jsxs("span", { className: "text-sm text-muted-foreground", children: ["Welcome, ", user.username, " (", user.role, ")"] }))] }), _jsxs(Button, { variant: "ghost", onClick: handleLogout, className: "flex items-center space-x-2", children: [_jsx(LogOut, { className: "h-4 w-4" }), _jsx("span", { children: "Logout" })] })] }) }), _jsx("main", { className: "container mx-auto px-4 py-8", children: availableTabs.length > 0 && (_jsxs(Tabs, { defaultValue: defaultTab, className: "space-y-6", children: [_jsx(TabsList, { children: availableTabs.map(tab => (_jsx(TabsTrigger, { value: tab.id, children: tab.label }, tab.id))) }), availableTabs.map(tab => (_jsx(TabsContent, { value: tab.id, children: tab.component }, tab.id)))] })) })] }));
};
export default Layout;
