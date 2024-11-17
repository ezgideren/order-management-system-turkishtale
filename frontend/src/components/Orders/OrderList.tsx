// src/components/Order/OrderList.tsx
import React from 'react';
import { OrderCard } from './OrderCard';
import { useApp } from '@/contexts/AppContext';
import { Order } from '@/types';

interface OrderListProps {
    activeFilter: string;
    onAddItems: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
                                                        activeFilter,
                                                        onAddItems
                                                    }) => {
    const { orders, userRole } = useApp();

    // Filter orders based on the active filter
    const filteredOrders = React.useMemo(() => {
        if (activeFilter === 'all') return orders;
        return orders.filter(order =>
            order.items.some(item => item.status === activeFilter)
        );
    }, [orders, activeFilter]);

    const canManageOrders = userRole === 'server' || userRole === 'admin';

    if (filteredOrders.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-2 text-sm text-gray-500">
                    {activeFilter === 'all'
                        ? "There are no active orders at the moment."
                        : `No orders with status "${activeFilter}" found.`
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map(order => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onAddItems={canManageOrders ? onAddItems : undefined}
                />
            ))}
        </div>
    );
};