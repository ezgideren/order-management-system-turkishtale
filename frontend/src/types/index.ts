// src/types/index.ts
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';
export type UserRole = 'admin' | 'server' | 'kitchen';
export type TableStatus = 'available' | 'occupied' | 'reserved';
export type OrderItemStatus = 'pending' | 'preparing' | 'ready' | 'delivered';


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
    tableNumber: string;
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
    id: String;
    number: number;
    seats: number;
    status: TableStatus;
    reservedBy?: string;
    reservedUntil?: Date;
    currentOrderId?: string;

}

interface TableCardProps {
    id: string;
    number: number;
    seats: number;
    status: TableStatus;
    onStatusChange: (status: TableStatus) => void;
}

export interface AppContextType {
    menuItems: MenuItem[];
    orders: Order[];
    tables: Table[];
    activeFilter: string;
    userRole: UserRole;
    isLoading: boolean;
    addTable: (seats: number) => void;  // Add this
// ... other properties
}