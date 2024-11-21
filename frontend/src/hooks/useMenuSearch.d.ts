import type { MenuItem } from '@/types';
export declare const useMenuSearch: (menuItems: MenuItem[]) => {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: MenuItem[];
    isSearching: boolean;
    clearSearch: () => void;
};
