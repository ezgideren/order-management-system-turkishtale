import * as React from 'react';
import { MenuItem, Order, OrderItem, Table, UserRole } from '../types/index';
export type TableStatus = 'available' | 'occupied' | 'reserved';
export type OrderStatus = 'pending' | 'in-progress' | 'completed';
interface AppContextType {
    menuItems: MenuItem[];
    orders: Order[];
    tables: Table[];
    activeFilter: string;
    isLoading: boolean;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    setMenuItems: (items: MenuItem[]) => void;
    addMenuItem: (item: MenuItem) => void;
    updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;
    toggleItemAvailability: (id: string) => void;
    addTable: (seats: number) => void;
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    updateOrderItemStatus: (orderId: string, itemId: string) => void;
    addItemsToOrder: (orderId: string, items: OrderItem[]) => void;
    deleteOrder: (orderId: string) => void;
    getTables: () => Table[];
    getAvailableTables: () => Table[];
    updateTableStatus: (tableId: string, status: TableStatus, orderId?: string) => void;
    setActiveFilter: (filter: string) => void;
    getKitchenOrders: () => Order[];
    getTableOrders: (tableId: string) => Order[];
    clearCompletedOrders: () => void;
}
export declare const AppContext: React.Context<AppContextType>;
export declare const AppProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useApp: () => AppContextType;
export {};
