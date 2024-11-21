import { useState } from 'react';
export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const updateItemStatus = (orderId, itemId) => {
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
    const addOrder = (newOrder) => {
        setOrders(prev => [...prev, newOrder]);
    };
    const updateOrder = (orderId, newItems) => {
        setOrders(prev => prev.map(order => order.id === orderId
            ? { ...order, items: [...order.items, ...newItems] }
            : order));
    };
    return {
        orders,
        updateItemStatus,
        addOrder,
        updateOrder
    };
};
