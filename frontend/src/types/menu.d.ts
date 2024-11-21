export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    category: string;
    type: 'hot' | 'cold';
    available: boolean;
    preparationTime: number;
    modificationOptions: string[];
}
export interface CategoryStats {
    [key: string]: number;
}
export interface MenuFormProps {
    onAddMenuItem: (item: Omit<MenuItem, '_id'>) => Promise<void>;
    categories: string[];
}
export interface MenuListProps {
    items: MenuItem[];
    onUpdateItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
    onDeleteItem: (id: string) => Promise<void>;
    onToggleAvailability: (id: string) => Promise<void>;
    categories: string[];
}
export interface MenuSearchProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    onClear: () => void;
    isSearching: boolean;
}
export interface MenuStatsProps {
    totalItems: number;
    categoryStats: CategoryStats;
    mostPopularCategory: string | null;
}
