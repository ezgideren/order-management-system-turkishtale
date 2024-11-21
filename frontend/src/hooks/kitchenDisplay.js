// src/hooks/useKitchenDisplay.ts
import { useMemo } from 'react';
export const useKitchenDisplay = (orders) => {
    return useMemo(() => {
        const now = new Date();
        // Filter active kitchen orders (orders with non-delivered kitchen items)
        const kitchenOrders = orders.filter(order => order.items.some(item => item.preparedKitchen && item.status !== 'delivered'));
        // Group orders by urgency (> 15 minutes = urgent)
        const groupedOrders = {
            urgent: kitchenOrders.filter(order => {
                const waitTime = (now.getTime() - new Date(order.timestamp).getTime()) / 1000 / 60;
                return waitTime > 15;
            }),
            normal: kitchenOrders.filter(order => {
                const waitTime = (now.getTime() - new Date(order.timestamp).getTime()) / 1000 / 60;
                return waitTime <= 15;
            })
        };
        // Calculate kitchen statistics
        const stats = {
            activeOrders: kitchenOrders.length,
            urgentOrders: groupedOrders.urgent.length,
            itemsToPrepare: kitchenOrders.reduce((acc, order) => acc + order.items.filter(item => item.preparedKitchen && item.status === 'pending').length, 0)
        };
        return {
            kitchenOrders,
            groupedOrders,
            stats,
            hasActiveOrders: kitchenOrders.length > 0
        };
    }, [orders]);
};
