import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Clock, ChefHat, Store, AlertCircle } from 'lucide-react';
import { getStatusButtonText } from '@/utils/statusHelpers';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const ItemGroup = ({ item, orderId, onUpdateStatus, userRole }) => {
    const canUpdateStatus = userRole === 'server' ||
        userRole === 'admin' ||
        (userRole === 'kitchen' && item.preparedKitchen);
    return (_jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 group", children: [_jsxs("div", { className: "flex flex-col flex-grow", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-medium", children: [item.quantity, "x ", item.name] }), item.preparedKitchen ? (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(ChefHat, { className: "h-4 w-4 text-orange-500" }) }), _jsx(TooltipContent, { children: "Kitchen Prepared" })] }) })) : (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Store, { className: "h-4 w-4 text-blue-500" }) }), _jsx(TooltipContent, { children: "Front Station" })] }) }))] }), item.notes && (_jsxs("div", { className: "flex items-start gap-1 mt-1", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-yellow-500 mt-0.5" }), _jsx("span", { className: "text-sm text-gray-600", children: item.notes })] }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: item.status === 'pending' ? 'destructive' :
                            item.status === 'ready' ? 'default' : 'secondary', children: item.status }), item.status !== 'delivered' && canUpdateStatus && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => onUpdateStatus(orderId, item.id), className: "opacity-0 group-hover:opacity-100 transition-opacity", children: getStatusButtonText(item.status) }))] })] }));
};
export const OrderCard = ({ order, onUpdateStatus, onAddItems, userRole }) => {
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
        if (allDelivered)
            return 'completed';
        if (anyReady)
            return 'ready';
        if (allPending)
            return 'pending';
        return 'in-progress';
    }, [order.items]);
    const statusColors = {
        completed: 'bg-green-50 border-green-200',
        ready: 'bg-blue-50 border-blue-200',
        pending: 'bg-orange-50 border-orange-200',
        'in-progress': 'bg-yellow-50 border-yellow-200'
    };
    return (_jsxs(Card, { className: `transition-all hover:shadow-md ${statusColors[orderStatus]}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(CardTitle, { children: ["Table ", order.tableNumber] }), _jsx(Badge, { variant: "outline", className: "capitalize", children: orderStatus })] }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), elapsedTime < 60
                                                    ? `${elapsedTime}m ago`
                                                    : `${Math.floor(elapsedTime / 60)}h ${elapsedTime % 60}m ago`] }) }), _jsx(TooltipContent, { children: new Date(order.timestamp).toLocaleString() })] }) })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [order.items.filter(item => item.preparedKitchen).length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "text-sm font-semibold text-gray-500 flex items-center gap-2", children: [_jsx(ChefHat, { className: "h-4 w-4" }), "Kitchen Items"] }), order.items
                                    .filter(item => item.preparedKitchen)
                                    .map(item => (_jsx(ItemGroup, { item: item, orderId: order.id, onUpdateStatus: onUpdateStatus, userRole: userRole }, item.id)))] })), order.items.filter(item => !item.preparedKitchen).length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "text-sm font-semibold text-gray-500 flex items-center gap-2", children: [_jsx(Store, { className: "h-4 w-4" }), "Front Station Items"] }), order.items
                                    .filter(item => !item.preparedKitchen)
                                    .map(item => (_jsx(ItemGroup, { item: item, orderId: order.id, onUpdateStatus: onUpdateStatus, userRole: userRole }, item.id)))] }))] }) }), _jsxs(CardFooter, { className: "justify-between border-t pt-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "font-medium", children: "Total Items:" }), order.items.reduce((acc, item) => acc + item.quantity, 0)] }), (userRole === 'server' || userRole === 'admin') && (_jsx(Button, { variant: "default", size: "sm", onClick: () => onAddItems(order), className: "ml-auto", children: "Add Items" }))] })] }));
};
export default OrderCard;
