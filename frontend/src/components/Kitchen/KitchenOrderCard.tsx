// src/components/Kitchen/KitchenOrderCard.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { Clock, ChefHat } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Order } from '@/types';

interface KitchenOrderCardProps {
    order: Order;
    isUrgent: boolean;
}

const formatElapsedTime = (timestamp: Date): string => {
    const diffInMinutes = Math.floor(
        (new Date().getTime() - new Date(timestamp).getTime()) / 1000 / 60
    );

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}m`;
};

export const KitchenOrderCard: React.FC<KitchenOrderCardProps> = ({
                                                                      order,
                                                                      isUrgent
                                                                  }) => {
    const { updateOrderItemStatus } = useApp();

    // Filter only active kitchen items (not delivered)
    const kitchenItems = order.items.filter(
        item => item.preparedKitchen && item.status !== 'delivered'
    );

    return (
        <Card className={`${isUrgent ? 'border-red-500 bg-red-50' : ''}`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle>Table {order.tableNumber}</CardTitle>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={`text-sm ${isUrgent ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                            {formatElapsedTime(order.timestamp)} ago
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {kitchenItems.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center p-2 bg-background rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <ChefHat className="h-4 w-4 text-orange-500" />
                                <div>
                                    <div className="font-medium">
                                        {item.quantity}x {item.name}
                                    </div>
                                    {item.notes && (
                                        <div className="text-sm text-muted-foreground">
                                            Note: {item.notes}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={item.status === 'pending' ? 'destructive' : 'default'}
                                >
                                    {item.status}
                                </Badge>
                                {item.status !== 'delivered' && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateOrderItemStatus(order.id, item.id)}
                                    >
                                        {item.status === 'pending' ? 'Start Preparing' :
                                            item.status === 'preparing' ? 'Mark Ready' :
                                                'Mark Delivered'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};