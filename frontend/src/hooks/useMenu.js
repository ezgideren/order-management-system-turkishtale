// src/hooks/useMenu.ts
import { useState, useCallback } from 'react';
export const useMenu = ({ onItemsChange } = {}) => {
    const [menuItems, setMenuItems] = useState([]);
    const addMenuItem = useCallback((newItem) => {
        setMenuItems(prev => {
            const updated = [...prev, newItem];
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);
    const updateMenuItem = useCallback((id, updatedItem) => {
        setMenuItems(prev => {
            const updated = prev.map(item => item.itemId === id ? { ...item, ...updatedItem } : item);
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);
    const deleteMenuItem = useCallback((id) => {
        setMenuItems(prev => {
            const updated = prev.filter(item => item.itemId !== id);
            onItemsChange?.(updated);
            return updated;
        });
    }, [onItemsChange]);
    const toggleAvailability = useCallback((id) => {
        setMenuItems(prev => {
            const updated = prev.map(item => item.itemId === id
                ? { ...item, available: !item.available }
                : item);
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
