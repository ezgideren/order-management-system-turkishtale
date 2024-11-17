// src/hooks/useMenu.ts
import { useState, useCallback } from 'react';
import type { MenuItem } from '@/types';

interface UseMenuProps {
    onItemsChange?: (items: MenuItem[]) => void;
}

export const useMenu = ({ onItemsChange }: UseMenuProps = {}) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const addMenuItem = useCallback((newItem: MenuItem) => {
        setMenuItems(prev => {
            const updated = [...prev, newItem];
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);

    const updateMenuItem = useCallback((id: string, updatedItem: MenuItem) => {
        setMenuItems(prev => {
            const updated = prev.map(item =>
                item.itemId === id ? { ...item, ...updatedItem } : item
            );
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);

    const deleteMenuItem = useCallback((id: string) => {
        setMenuItems(prev => {
            const updated = prev.filter(item => item.itemId !== id);
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);

    const toggleAvailability = useCallback((id: string) => {
        setMenuItems(prev => {
            const updated = prev.map(item =>
                item.itemId === id
                    ? { ...item, available: !item.available }
                    : item
            );
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);

    return {
        menuItems,
        setMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability
    };
};