import React, { useMemo } from 'react';
import { Order, OrderItem, UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Clock, ChefHat, Store, AlertCircle } from 'lucide-react';
import { getStatusColor, getStatusButtonText } from '@/utils/statusHelpers';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (orderId: string, itemId: string) => void;
    onAddItems: (order: Order) => void;
    userRole: UserRole;
}

interface ItemGroupProps {
    item: OrderItem;
    orderId: string;
    onUpdateStatus: (orderId: string, itemId: string) => void;
    userRole: UserRole;
}

const ItemGroup: React.FC<ItemGroupProps> = ({
                                                 item,
                                                 orderId,
                                                 onUpdateStatus,
                                                 userRole
                                             }) => {
    const canUpdateStatus = userRole === 'server' ||
        userRole === 'admin' ||
        (userRole === 'kitchen' && item.preparedKitchen);

    return (
        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 group">
            <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{item.quantity}x {item.name}</span>
                    {item.preparedKitchen ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ChefHat className="h-4 w-4 text-orange-500" />
                                </TooltipTrigger>
                                <TooltipContent>Kitchen Prepared</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Store className="h-4 w-4 text-blue-500" />
                                </TooltipTrigger>
                                <TooltipContent>Front Station</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                {item.notes && (
                    <div className="flex items-start gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{item.notes}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Badge variant={item.status === 'pending' ? 'destructive' :
                    item.status === 'ready' ? 'default' : 'secondary'}
                >
                    {item.status}
                </Badge>

                {item.status !== 'delivered' && canUpdateStatus && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateStatus(orderId, item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        {getStatusButtonText(item.status)}
                    </Button>
                )}
            </div>
        </div>
    );
};

export const OrderCard: React.FC<OrderCardProps> = ({
                                                        order,
                                                        onUpdateStatus,
                                                        onAddItems,
                                                        userRole
                                                    }) => {
    const elapsedTime = useMemo(() => {
        const now = new Date();
        const orderTime = new Date(order.timestamp);
        const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
        return diffInMinutes;
    }, [order.timestamp]);

    const orderStatus = useMemo(() => {
        const allDelivered = order.items.every(item => item.status === 'delivered');
        const anyReady = order.items.some(item => item.status === 'ready');
        const allPending = order.items.every(item => item.status === 'pending');

        if (allDelivered) return 'completed';
        if (anyReady) return 'ready';
        if (allPending) return 'pending';
        return 'in-progress';
    }, [order.items]);

    const statusColors = {
        completed: 'bg-green-50 border-green-200',
        ready: 'bg-blue-50 border-blue-200',
        pending: 'bg-orange-50 border-orange-200',
        'in-progress': 'bg-yellow-50 border-yellow-200'
    };

    return (
        <Card className={`transition-all hover:shadow-md ${statusColors[orderStatus]}`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <CardTitle>Table {order.tableNumber}</CardTitle>
                        <Badge variant="outline" className="capitalize">
                            {orderStatus}
                        </Badge>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {elapsedTime < 60
                                        ? `${elapsedTime}m ago`
                                        : `${Math.floor(elapsedTime / 60)}h ${elapsedTime % 60}m ago`
                                    }
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {new Date(order.timestamp).toLocaleString()}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    {/* Kitchen Items */}
                    {order.items.filter(item => item.preparedKitchen).length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                                <ChefHat className="h-4 w-4" />
                                Kitchen Items
                            </h3>
                            {order.items
                                .filter(item => item.preparedKitchen)
                                .map(item => (
                                    <ItemGroup
                                        key={item.id}
                                        item={item}
                                        orderId={order.id}
                                        onUpdateStatus={onUpdateStatus}
                                        userRole={userRole}
                                    />
                                ))}
                        </div>
                    )}

                    {/* Front Station Items */}
                    {order.items.filter(item => !item.preparedKitchen).length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                                <Store className="h-4 w-4" />
                                Front Station Items
                            </h3>
                            {order.items
                                .filter(item => !item.preparedKitchen)
                                .map(item => (
                                    <ItemGroup
                                        key={item.id}
                                        item={item}
                                        orderId={order.id}
                                        onUpdateStatus={onUpdateStatus}
                                        userRole={userRole}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="justify-between border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Total Items:</span>
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                </div>

                {(userRole === 'server' || userRole === 'admin') && (
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => onAddItems(order)}
                        className="ml-auto"
                    >
                        Add Items
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default OrderCard;