import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { Clock, ChefHat } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
const formatElapsedTime = (timestamp) => {
    const diffInMinutes = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000 / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}m`;
};
export const KitchenOrderCard = ({ order, isUrgent }) => {
    const { updateOrderItemStatus } = useApp();
    // Filter only active kitchen items (not delivered)
    const kitchenItems = order.items.filter(item => item.preparedKitchen && item.status !== 'delivered');
    return (_jsxs(Card, { className: `${isUrgent ? 'border-red-500 bg-red-50' : ''}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Table ", order.tableNumber] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }), _jsxs("span", { className: `text-sm ${isUrgent ? 'text-red-500 font-bold' : 'text-muted-foreground'}`, children: [formatElapsedTime(order.timestamp), " ago"] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: kitchenItems.map(item => (_jsxs("div", { className: "flex justify-between items-center p-2 bg-background rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ChefHat, { className: "h-4 w-4 text-orange-500" }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: [item.quantity, "x ", item.name] }), item.notes && (_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Note: ", item.notes] }))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: item.status === 'pending' ? 'destructive' : 'default', children: item.status }), item.status !== 'delivered' && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => updateOrderItemStatus(order.id, item.id), children: item.status === 'pending' ? 'Start Preparing' :
                                            item.status === 'preparing' ? 'Mark Ready' :
                                                'Mark Delivered' }))] })] }, item.id))) }) })] }));
};
