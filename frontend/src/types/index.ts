// src/types/index.ts
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';
export type UserRole = 'admin' | 'server' | 'kitchen';
export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface MenuItem {
    itemId: string;
    name: string;
    price: number;
    category: string;
    available: boolean;
    preparedKitchen: boolean;
}

export interface OrderItem {
    id: string;
    itemId: string;
    name: string;
    quantity: number;
    notes: string;
    status: OrderStatus;
    preparedKitchen: boolean;
}

export interface Order {
    id: string;
    tableNumber: number;
    items: OrderItem[];
    timestamp: Date;
    status?: 'pending' | 'in-progress' | 'completed';
}

export interface KitchenStats {
    activeOrders: number;
    urgentOrders: number;
    itemsToPrepare: number;
}

export interface Table {
    number: number;
    status: TableStatus;
    reservedBy: string | null;
    reservedUntil: Date | null;
}