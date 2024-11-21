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
import { Order, OrderItem } from '@/types/index';

export const OrderManagement = () => {
    const { userRole, setUserRole, addOrder, addItemsToOrder } = useApp();
    const { toast } = useToast();
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

    const handleAddOrder = (order: Order) => {
        try {
            addOrder(order);
            toast({
                title: "Success",
                description: "Order created successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create order",
                variant: "destructive"
            });
        }
    };

    const handleUpdateOrder = (orderId: string, items: OrderItem[]) => {
        try {
            addItemsToOrder(orderId, items);
            toast({
                title: "Success",
                description: "Items added to order successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add items to order",
                variant: "destructive"
            });
        }
    };

    const canCreateOrders = userRole === 'server' || userRole === 'admin';

    return (
        <Card>
            <CardHeader className="flex items-center justify-between mb-8">
                <CardTitle>Order Management</CardTitle>
                <div className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                    <StatusFilter
                        value={activeFilter}
                        onChange={setActiveFilter}
                    />
                    {canCreateOrders && (
                        <Button
                            onClick={() => {
                                setSelectedOrder(null);
                                setIsNewOrderDialogOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Order
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <OrderList
                    activeFilter={activeFilter}
                    onAddItems={(order) => {
                        setSelectedOrder(order);
                        setIsNewOrderDialogOpen(true);
                    }}
                />

                <NewOrderDialog
                    open={isNewOrderDialogOpen}
                    onOpenChange={setIsNewOrderDialogOpen}
                    selectedOrder={selectedOrder}
                    onAddOrder={handleAddOrder}
                    onUpdateOrder={handleUpdateOrder}
                />
            </CardContent>
        </Card>
    );
};

export default OrderManagement;