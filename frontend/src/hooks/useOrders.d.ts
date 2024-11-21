import { Order, OrderItem } from '../types/index';
export declare const useOrders: () => {
    orders: Order[];
    updateItemStatus: (orderId: string, itemId: string) => void;
    addOrder: (newOrder: Order) => void;
    updateOrder: (orderId: string, newItems: OrderItem[]) => void;
};
