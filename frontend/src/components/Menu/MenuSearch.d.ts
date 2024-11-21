import React from 'react';
interface MenuSearchProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    onClear: () => void;
    isSearching: boolean;
}
export declare const MenuSearch: React.FC<MenuSearchProps>;
export {};
