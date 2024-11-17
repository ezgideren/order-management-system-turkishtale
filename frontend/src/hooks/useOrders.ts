import { useState } from 'react';
import { Order, OrderItem } from '../types/index';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const updateItemStatus = (orderId: string, itemId: string) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    items: order.items.map(item => {
                        if (item.id === itemId) {
                            const newStatus = item.status === 'pending' ? 'ready' :
                                item.status === 'ready' ? 'delivered' : item.status;
                            return { ...item, status: newStatus };
                        }
                        return item;
                    })
                };
            }
            return order;
        }));
    };

    const addOrder = (newOrder: Order) => {
        setOrders(prev => [...prev, newOrder]);
    };

    const updateOrder = (orderId: string, newItems: OrderItem[]) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId
                ? { ...order, items: [...order.items, ...newItems] }
                : order
        ));
    };

    return {
        orders,
        updateItemStatus,
        addOrder,
        updateOrder
    };
};

