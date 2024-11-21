import React from 'react';
import { MenuItem } from '@/types';
interface MenuItemCardProps {
    item: MenuItem;
    onUpdate?: (itemId: string, updates: Partial<MenuItem>) => void;
    onDelete?: (itemId: string) => void;
    onToggleAvailability?: (itemId: string) => void;
}
export declare const MenuItemCard: React.FC<MenuItemCardProps>;
export {};
