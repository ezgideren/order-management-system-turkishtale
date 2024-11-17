// src/utils/roleUtils.ts
import { UserRole } from '@/types';

export const canManageOrders = (role: UserRole): boolean => {
    return role === 'server' || role === 'admin';
};

export const canAccessKitchen = (role: UserRole): boolean => {
    return role === 'kitchen' || role === 'admin';
};

export const canManageMenu = (role: UserRole): boolean => {
    return role === 'admin';
};