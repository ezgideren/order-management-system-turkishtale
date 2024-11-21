import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useApp } from '@/contexts/AppContext';
import { AlertCircle, ChefHat } from 'lucide-react';
import { KitchenOrderCard } from './KitchenOrderCard';
import { useKitchenDisplay } from '../../hooks/kitchenDisplay';
export const KitchenDisplay = () => {
    const { orders } = useApp();
    const { groupedOrders, stats, hasActiveOrders } = useKitchenDisplay(orders);
    // Empty state
    if (!hasActiveOrders) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center h-[60vh] space-y-4", children: [_jsx(ChefHat, { className: "h-16 w-16 text-muted-foreground" }), _jsx("h3", { className: "text-xl font-semibold", children: "No Active Kitchen Orders" }), _jsx("p", { className: "text-muted-foreground", children: "New orders will appear here" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base", children: "Active Orders" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: stats.activeOrders }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base", children: "Urgent Orders" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-red-500", children: stats.urgentOrders }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base", children: "Items to Prepare" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: stats.itemsToPrepare }) })] })] }), groupedOrders.urgent.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }), _jsx("h2", { className: "text-lg font-semibold", children: "Urgent Orders" })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: groupedOrders.urgent.map(order => (_jsx(KitchenOrderCard, { order: order, isUrgent: true }, order.id))) })] })), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Active Orders" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: groupedOrders.normal.map(order => (_jsx(KitchenOrderCard, { order: order, isUrgent: false }, order.id))) })] })] }));
};
