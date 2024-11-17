// src/hooks/useMenuCategories.ts
import { useMemo } from 'react';
import type { MenuItem } from '@/types';

export const useMenuCategories = (menuItems: MenuItem[]) => {
    return useMemo(() => {
        const categories = new Set<string>();
        const categoryStats: { [key: string]: number } = {};

        menuItems.forEach(item => {
            categories.add(item.category);
            categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
        });

        const totalItems = menuItems.length;
        const mostPopularCategory = Object.entries(categoryStats)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || null;

        return {
            categories: Array.from(categories),
            categoryStats,
            totalItems,
            mostPopularCategory
        };
    }, [menuItems]);
};