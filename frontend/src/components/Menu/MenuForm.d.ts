import React from 'react';
import { MenuItem } from '@/types/';
interface MenuFormProps {
    onAddMenuItem: (newItem: Omit<MenuItem, "itemId">) => void;
    categories: string[];
}
export declare const MenuForm: React.FC<MenuFormProps>;
export {};
