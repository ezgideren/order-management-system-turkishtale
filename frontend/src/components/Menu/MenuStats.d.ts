import React from 'react';
interface MenuStatsProps {
    totalItems: number;
    categoryStats: {
        [key: string]: number;
    };
    mostPopularCategory: string | null;
}
export declare const MenuStats: React.FC<MenuStatsProps>;
export {};
