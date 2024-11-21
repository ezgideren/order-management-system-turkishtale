import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Order/OrderManagement.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderList } from './OrderList';
import { StatusFilter } from './StatusFilter';
import { NewOrderDialog } from './NewOrderDialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from "@/components/ui/use-toast";
export const OrderManagement = () => {
    const { userRole, setUserRole, addOrder, addItemsToOrder } = useApp();
    const { toast } = useToast();
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const handleAddOrder = (order) => {
        try {
            addOrder(order);
            toast({
                title: "Success",
                description: "Order created successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to create order",
                variant: "destructive"
            });
        }
    };
    const handleUpdateOrder = (orderId, items) => {
        try {
            addItemsToOrder(orderId, items);
            toast({
                title: "Success",
                description: "Items added to order successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to add items to order",
                variant: "destructive"
            });
        }
    };
    const canCreateOrders = userRole === 'server' || userRole === 'admin';
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex items-center justify-between mb-8", children: [_jsx(CardTitle, { children: "Order Management" }), _jsxs("div", { className: "flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50", children: [_jsx(StatusFilter, { value: activeFilter, onChange: setActiveFilter }), canCreateOrders && (_jsxs(Button, { onClick: () => {
                                    setSelectedOrder(null);
                                    setIsNewOrderDialogOpen(true);
                                }, className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "New Order"] }))] })] }), _jsxs(CardContent, { children: [_jsx(OrderList, { activeFilter: activeFilter, onAddItems: (order) => {
                            setSelectedOrder(order);
                            setIsNewOrderDialogOpen(true);
                        } }), _jsx(NewOrderDialog, { open: isNewOrderDialogOpen, onOpenChange: setIsNewOrderDialogOpen, selectedOrder: selectedOrder, onAddOrder: handleAddOrder, onUpdateOrder: handleUpdateOrder })] })] }));
};
export default OrderManagement;
