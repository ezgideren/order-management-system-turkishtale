import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { Trash, ChefHat, Store } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
export const MenuItemCard = ({ item, onUpdate, onDelete, onToggleAvailability }) => {
    const { toggleItemAvailability, deleteMenuItem } = useApp();
    const handleToggleAvailability = () => {
        if (onToggleAvailability) {
            onToggleAvailability(item.itemId);
        }
        else {
            toggleItemAvailability(item.itemId);
        }
    };
    const handleDelete = () => {
        if (onDelete) {
            onDelete(item.itemId);
        }
        else {
            deleteMenuItem(item.itemId);
        }
    };
    return (_jsxs(Card, { className: !item.available ? 'opacity-60' : undefined, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center justify-between", children: [item.name, item.preparedKitchen ? (_jsx(ChefHat, { className: "h-5 w-5 text-orange-500" })) : (_jsx(Store, { className: "h-5 w-5 text-blue-500" }))] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-lg font-bold", children: ["$", item.price.toFixed(2)] }), _jsx(Badge, { variant: "outline", children: item.category }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Prepared in: ", item.preparedKitchen ? 'Kitchen' : 'Front Station'] })] }) }), _jsxs(CardFooter, { className: "justify-between", children: [_jsx(Button, { variant: item.available ? "outline" : "default", onClick: handleToggleAvailability, children: item.available ? 'Mark Unavailable' : 'Mark Available' }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "text-red-500", children: _jsx(Trash, { className: "h-4 w-4" }) }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete Menu Item" }), _jsxs(AlertDialogDescription, { children: ["Are you sure you want to delete \"", item.name, "\"? This action cannot be undone."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-red-500 hover:bg-red-600", children: "Delete" })] })] })] })] })] }));
};
