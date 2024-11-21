// src/components/Menu/MenuManagement.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MenuForm } from './MenuForm';
import { MenuList } from './MenuList';
import { MenuSearch } from './MenuSearch';
import { MenuStats } from './MenuStats';
import { useApp } from '@/contexts/AppContext';
import { useApi } from '@/contexts/ApiContext';
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMenuCategories } from '@/hooks/useMenuCategories';
import { useMenuSearch } from '@/hooks/useMenuSearch';
import type { MenuItem } from '@/types';

export const MenuManagement: React.FC = () => {
    const { api } = useApi();
    const { menuItems, setMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleItemAvailability } = useApp();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const {
        categories,
        categoryStats,
        totalItems,
        mostPopularCategory
    } = useMenuCategories(menuItems);

    const {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        clearSearch,
    } = useMenuSearch(menuItems);

    React.useEffect(() => {
        const loadMenuItems = async () => {
            try {
                setIsLoading(true);
                const items = await api.get<MenuItem[]>('/menu');
                setMenuItems(items);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load menu items';
                setError(errorMessage);
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive"
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadMenuItems();
    }, [api, setMenuItems, toast]);

    const handleAddMenuItem = async (newItem: Omit<MenuItem, '_id'>) => {
        try {
            const response = await api.post<MenuItem>('/menu', newItem);
            addMenuItem(response);
            toast({
                title: "Success",
                description: "Menu item added successfully",
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add menu item';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        }
    };

    const handleUpdateMenuItem = async (id: string, updatedItem: Partial<MenuItem>) => {
        try {
            const response = await api.put<MenuItem>(`/menu/${id}`, updatedItem);
            updateMenuItem(id, response);
            toast({
                title: "Success",
                description: "Menu item updated successfully",
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update menu item';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        }
    };

    const handleDeleteMenuItem = async (id: string) => {
        try {
            await api.delete(`/menu/${id}`);
            deleteMenuItem(id);
            toast({
                title: "Success",
                description: "Menu item deleted successfully",
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete menu item';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        }
    };

    const handleToggleAvailability = async (id: string) => {
        try {
            await api.patch<MenuItem>(`/menu/${id}/availability`);
            toggleItemAvailability(id);
            toast({
                title: "Success",
                description: "Item availability updated successfully",
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update item availability';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <MenuStats
                totalItems={totalItems}
                categoryStats={categoryStats}
                mostPopularCategory={mostPopularCategory}
            />

            <Card>
                <CardHeader>
                    <CardTitle>Menu Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <MenuForm
                        onAddMenuItem={handleAddMenuItem}
                        categories={categories}
                    />
                    <MenuSearch
                        searchQuery={searchQuery}
                        onSearch={setSearchQuery}
                        onClear={clearSearch}
                        isSearching={isSearching}
                    />
                    <MenuList
                        items={searchResults}
                        onUpdateItem={handleUpdateMenuItem}
                        onDeleteItem={handleDeleteMenuItem}
                        onToggleAvailability={handleToggleAvailability}
                        categories={categories}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default MenuManagement;