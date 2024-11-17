// src/pages/layout.tsx
import React from 'react';
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
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Define available tabs based on user role
    const getAvailableTabs = () => {
        switch (user?.role) {
            case 'admin': // hale
                return [
                    { id: 'menu', label: 'Menu Management', component: <MenuManagement /> },
                    { id: 'orders', label: 'Orders', component: <OrderManagement /> },
                    { id: 'tables', label: 'Tables', component: <TableManagement /> },
                    { id: 'kitchen', label: 'Kitchen Display', component: <KitchenDisplay /> }
                ];
            case 'server': // servis
                return [
                    { id: 'orders', label: 'Orders', component: <OrderManagement /> },
                    { id: 'tables', label: 'Tables', component: <TableManagement /> }
                ];
            case 'kitchen': // kitchen
                return [
                    { id: 'kitchen', label: 'Kitchen Display', component: <KitchenDisplay /> }
                ];
            default:
                return [];
        }
    };

    const availableTabs = getAvailableTabs();
    const defaultTab = availableTabs[0]?.id;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold">Turkish Tale</h1>
                        {user && (
                            <span className="text-sm text-muted-foreground">
                                Welcome, {user.username} ({user.role})
                            </span>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {availableTabs.length > 0 && (
                    <Tabs defaultValue={defaultTab} className="space-y-6">
                        <TabsList>
                            {availableTabs.map(tab => (
                                <TabsTrigger key={tab.id} value={tab.id}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {availableTabs.map(tab => (
                            <TabsContent key={tab.id} value={tab.id}>
                                {tab.component}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </main>
        </div>
    );
};

export default Layout;