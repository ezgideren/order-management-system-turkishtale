import type { MenuItem } from '@/types';
interface UseMenuProps {
    onItemsChange?: (items: MenuItem[]) => void;
}
export declare const useMenu: ({ onItemsChange }?: UseMenuProps) => {
    menuItems: MenuItem[];
    setMenuItems: import("react").Dispatch<import("react").SetStateAction<MenuItem[]>>;
    addMenuItem: (newItem: MenuItem) => void;
    updateMenuItem: (id: string, updatedItem: MenuItem) => void;
    deleteMenuItem: (id: string) => void;
    toggleAvailability: (id: string) => void;
};
export {};
