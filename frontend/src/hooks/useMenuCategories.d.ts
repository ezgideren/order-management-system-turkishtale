import type { MenuItem } from '@/types';
export declare const useMenuCategories: (menuItems: MenuItem[]) => {
    categories: string[];
    categoryStats: {
        [key: string]: number;
    };
    totalItems: number;
    mostPopularCategory: string;
};
