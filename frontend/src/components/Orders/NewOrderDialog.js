import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Plus, Trash, AlertCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
export const NewOrderDialog = ({ open, onOpenChange, selectedOrder, onAddOrder, onUpdateOrder }) => {
    const { menuItems = [], tables = [] } = useApp();
    const [tableNumber, setTableNumber] = React.useState('');
    const [orderItems, setOrderItems] = React.useState([]);
    const [currentItem, setCurrentItem] = React.useState({
        menuItemId: '',
        quantity: 1,
        notes: ''
    });
    const [error, setError] = React.useState('');
    // Reset form when dialog opens/closes
    React.useEffect(() => {
        if (open) {
            if (selectedOrder) {
                setTableNumber(selectedOrder.tableNumber.toString());
            }
            else {
                setTableNumber('');
            }
            setOrderItems([]);
            setCurrentItem({ menuItemId: '', quantity: 1, notes: '' });
            setError('');
        }
    }, [open, selectedOrder]);
    const availableMenuItems = React.useMemo(() => menuItems?.filter(item => item.available) ?? [], [menuItems]);
    const availableTables = React.useMemo(() => tables?.filter(table => table.seats > 0) ?? [], [tables]);
    const handleAddItem = () => {
        if (!currentItem.menuItemId) {
            setError('Please select a menu item');
            return;
        }
        const menuItem = menuItems?.find(item => item.itemId === currentItem.menuItemId);
        if (!menuItem) {
            setError('Selected menu item not found');
            return;
        }
        const newItem = {
            id: Date.now().toString(),
            itemId: menuItem.itemId,
            name: menuItem.name,
            quantity: currentItem.quantity,
            notes: currentItem.notes.trim(),
            status: 'pending',
            preparedKitchen: menuItem.preparedKitchen
        };
        setOrderItems(prev => [...prev, newItem]);
        setCurrentItem({ menuItemId: '', quantity: 1, notes: '' });
        setError('');
    };
    const handleRemoveItem = (itemId) => {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));
    };
    const calculateTotal = () => {
        return orderItems.reduce((total, item) => {
            const menuItem = menuItems?.find(mi => mi.itemId === item.itemId);
            return total + (menuItem?.price || 0) * item.quantity;
        }, 0);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tableNumber) {
            setError('Please select a table number');
            return;
        }
        if (orderItems.length === 0) {
            setError('Please add at least one item to the order');
            return;
        }
        if (selectedOrder) {
            onUpdateOrder(selectedOrder.id, orderItems);
        }
        else {
            const newOrder = {
                id: Date.now().toString(),
                tableNumber: tableNumber,
                items: orderItems,
                timestamp: new Date()
            };
            onAddOrder(newOrder);
        }
        onOpenChange(false);
    };
    if (!menuItems || !tables) {
        return null; // Or a loading state
    }
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: selectedOrder ? 'Add Items to Order' : 'Create New Order' }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "table", children: "Table Number" }), _jsxs(Select, { value: tableNumber, onValueChange: setTableNumber, disabled: !!selectedOrder, children: [_jsx(SelectTrigger, { id: "table", children: _jsx(SelectValue, { placeholder: "Select table" }) }), _jsx(SelectContent, { children: availableTables.map(table => (_jsxs(SelectItem, { value: table.id.toString(), children: ["Table ", table.id, " (", table.seats, " seats)"] }, table.number))) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Add Items" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: currentItem.menuItemId, onValueChange: value => setCurrentItem(prev => ({
                                                ...prev,
                                                menuItemId: value
                                            })), children: [_jsx(SelectTrigger, { className: "flex-1", children: _jsx(SelectValue, { placeholder: "Select menu item" }) }), _jsx(SelectContent, { children: availableMenuItems.map(item => (_jsxs(SelectItem, { value: item.itemId, children: [item.name, " ($", item.price.toFixed(2), ")"] }, item.itemId))) })] }), _jsx(Input, { type: "number", value: currentItem.quantity, onChange: e => setCurrentItem(prev => ({
                                                ...prev,
                                                quantity: parseInt(e.target.value) || 1
                                            })), min: "1", className: "w-20", placeholder: "Qty" }), _jsx(Button, { type: "button", onClick: handleAddItem, variant: "secondary", children: _jsx(Plus, { className: "h-4 w-4" }) })] }), _jsx(Textarea, { value: currentItem.notes, onChange: e => setCurrentItem(prev => ({
                                        ...prev,
                                        notes: e.target.value
                                    })), placeholder: "Special instructions or notes...", className: "h-20" })] }), orderItems.length > 0 && (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6 space-y-2", children: [orderItems.map((item) => {
                                        const menuItem = menuItems.find(mi => mi.itemId === item.itemId);
                                        return (_jsxs("div", { className: "flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg group", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-medium", children: [item.quantity, "x ", item.name] }), _jsxs(Badge, { variant: "outline", children: ["$", ((menuItem?.price || 0) * item.quantity).toFixed(2)] })] }), item.notes && (_jsx("span", { className: "text-sm text-gray-500", children: item.notes }))] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "opacity-0 group-hover:opacity-100 transition-opacity", onClick: () => handleRemoveItem(item.id), children: _jsx(Trash, { className: "h-4 w-4 text-red-500" }) })] }, item.id));
                                    }), _jsx("div", { className: "pt-4 border-t", children: _jsxs("div", { className: "flex justify-between items-center font-medium", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["$", calculateTotal().toFixed(2)] })] }) })] }) })), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: selectedOrder ? 'Add Items' : 'Create Order' })] })] })] }) }));
};
