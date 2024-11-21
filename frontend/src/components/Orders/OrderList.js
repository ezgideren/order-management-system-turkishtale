import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { OrderCard } from './OrderCard';
import { useApp } from '@/contexts/AppContext';
export const OrderList = ({ activeFilter, onAddItems }) => {
    const { orders, userRole, updateOrderItemStatus } = useApp();
    const filteredOrders = React.useMemo(() => {
        if (activeFilter === 'all')
            return orders;
        return orders.filter(order => order.items.some(item => item.status === activeFilter));
    }, [orders, activeFilter]);
    const canManageOrders = userRole === 'server' || userRole === 'admin';
    if (filteredOrders.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "No orders found" }), _jsx("p", { className: "mt-2 text-sm text-gray-500", children: activeFilter === 'all'
                        ? "There are no active orders at the moment."
                        : `No orders with status "${activeFilter}" found.` })] }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: filteredOrders.map(order => (_jsx(OrderCard, { order: order, onAddItems: canManageOrders ? onAddItems : undefined, onUpdateStatus: updateOrderItemStatus, userRole: userRole }, order.id))) }));
};
