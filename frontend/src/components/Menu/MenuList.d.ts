import React from 'react';
import { MenuItem } from '@/types';
interface MenuListProps {
    items: MenuItem[];
    onUpdateItem: (itemId: string, updates: Partial<MenuItem>) => void;
    onDeleteItem: (itemId: string) => void;
    onToggleAvailability: (itemId: string) => void;
    categories: string[];
}
export declare const MenuList: React.FC<MenuListProps>;
export {};
