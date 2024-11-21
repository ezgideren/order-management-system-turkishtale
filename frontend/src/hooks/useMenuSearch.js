// src/hooks/useMenuSearch.ts
import { useState, useMemo } from 'react';
export const useMenuSearch = (menuItems) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return menuItems;
        }
        const query = searchQuery.toLowerCase().trim();
        return menuItems.filter(item => item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query));
    }, [menuItems, searchQuery]);
    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    };
    return {
        searchQuery,
        setSearchQuery: (query) => {
            setSearchQuery(query);
            setIsSearching(!!query);
        },
        searchResults,
        isSearching,
        clearSearch
    };
};
