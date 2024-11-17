// src/components/Kitchen/KitchenDisplay.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useApp } from '@/contexts/AppContext';
import { Clock, AlertCircle, ChefHat } from 'lucide-react';
import { KitchenOrderCard } from './KitchenOrderCard';
import { useKitchenDisplay } from '../../hooks/kitchenDisplay';

export const KitchenDisplay: React.FC = () => {
    const { orders } = useApp();
    const { groupedOrders, stats, hasActiveOrders } = useKitchenDisplay(orders);

    // Empty state
    if (!hasActiveOrders) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <ChefHat className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-semibold">No Active Kitchen Orders</h3>
                <p className="text-muted-foreground">New orders will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Kitchen Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Active Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeOrders}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Urgent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                            {stats.urgentOrders}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Items to Prepare</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.itemsToPrepare}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Urgent Orders Section */}
            {groupedOrders.urgent.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <h2 className="text-lg font-semibold">Urgent Orders</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {groupedOrders.urgent.map(order => (
                            <KitchenOrderCard
                                key={order.id}
                                order={order}
                                isUrgent
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Normal Orders Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Active Orders</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {groupedOrders.normal.map(order => (
                        <KitchenOrderCard
                            key={order.id}
                            order={order}
                            isUrgent={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};