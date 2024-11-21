import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Soup, ClipboardList, Plus, Bell, UserCircle, LogOut, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const Layout = () => {
    const [userRole, setUserRole] = useState('primary_server');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('new');
    // Menu Items State
    const [menuItems, setMenuItems] = useState([
        {
            itemId: '1',
            name: 'Tantuni',
            price: 12.99,
            category: 'Mains',
            preparedKitchen: true,
            available: true
        },
        {
            itemId: '2',
            name: 'Hummus',
            price: 5.99,
            category: 'Starters',
            preparedKitchen: false,
            available: true
        }
    ]);
    // Orders State
    const [orders, setOrders] = useState([
        {
            id: '1',
            tableNumber: 1,
            items: [
                {
                    id: '1a',
                    itemId: '1',
                    name: 'Tantuni',
                    quantity: 2,
                    status: 'pending',
                    notes: 'Extra spicy',
                    preparedKitchen: true
                },
                {
                    id: '1b',
                    itemId: '2',
                    name: 'Hummus',
                    quantity: 1,
                    status: 'pending',
                    preparedKitchen: false
                }
            ],
            timestamp: new Date()
        }
    ]);
    // Tables State
    const [tables, setTables] = useState([
        {
            id: 1,
            seats: 4,
            status: 'available',
            position: { x: 0, y: 0 },
            rotation: 0
        },
        {
            id: 2,
            seats: 2,
            status: 'occupied',
            position: { x: 1, y: 0 },
            rotation: 0,
            currentOrder: '1'
        }
    ]);
    // Alerts State
    const [alerts] = useState([
        {
            id: '1',
            message: 'Hot food ready for Table 1',
            type: 'urgent',
            timestamp: new Date()
        }
    ]);
    const updateItemStatus = (orderId, itemId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    items: order.items.map(item => {
                        if (item.id === itemId) {
                            const newStatus = item.status === 'pending' ? 'ready' :
                                item.status === 'ready' ? 'delivered' :
                                    item.status;
                            return { ...item, status: newStatus };
                        }
                        return item;
                    })
                };
            }
            return order;
        }));
    };
    const getStatusColor = (status) => {
        const colors = {
            'pending': 'text-orange-500',
            'ready': 'text-green-500',
            'delivered': 'text-gray-500'
        };
        return colors[status] || 'text-gray-500';
    };
    const getStatusButtonText = (status) => {
        const text = {
            'pending': 'Mark Ready',
            'ready': 'Mark Delivered',
            'delivered': 'Delivered'
        };
        return text[status] || status;
    };
    // Menu Item Form Component
    const MenuItemForm = () => {
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [category, setCategory] = useState('');
        const [preparedKitchen, setPreparedKitchen] = useState(true);
        const handleSubmit = (e) => {
            e.preventDefault();
            const newItem = {
                itemId: Date.now().toString(),
                name,
                price: parseFloat(price),
                category,
                preparedKitchen,
                available: true
            };
            setMenuItems([...menuItems, newItem]);
            setName('');
            setPrice('');
            setCategory('');
        };
        return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Item Name" }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "price", children: "Price" }), _jsx(Input, { id: "price", type: "number", step: "0.01", value: price, onChange: (e) => setPrice(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "category", children: "Category" }), _jsxs(Select, { value: category, onValueChange: setCategory, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select category" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Starters", children: "Starters" }), _jsx(SelectItem, { value: "Mains", children: "Mains" }), _jsx(SelectItem, { value: "Desserts", children: "Desserts" }), _jsx(SelectItem, { value: "Drinks", children: "Drinks" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "preparedKitchen", checked: preparedKitchen, onChange: (e) => setPreparedKitchen(e.target.checked), className: "rounded border-gray-300" }), _jsx(Label, { htmlFor: "preparedKitchen", children: "Prepared in Kitchen" })] }), _jsx(Button, { type: "submit", children: "Add Menu Item" })] }));
    };
    // Order Form Component
    const OrderForm = ({ type, existingOrder = null }) => {
        const [tableNumber, setTableNumber] = useState(existingOrder?.tableNumber.toString() || '');
        const [selectedItem, setSelectedItem] = useState('');
        const [quantity, setQuantity] = useState('1');
        const [notes, setNotes] = useState('');
        const [orderItems, setOrderItems] = useState(existingOrder?.items || []);
        const handleAddItem = () => {
            const menuItem = menuItems.find(item => item.itemId === selectedItem);
            if (menuItem) {
                const newItem = {
                    id: Date.now().toString(),
                    itemId: menuItem.itemId,
                    name: menuItem.name,
                    quantity: parseInt(quantity),
                    notes: notes,
                    status: 'pending',
                    preparedKitchen: menuItem.preparedKitchen
                };
                setOrderItems([...orderItems, newItem]);
                setSelectedItem('');
                setQuantity('1');
                setNotes('');
            }
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            if (type === 'new') {
                const newOrder = {
                    id: Date.now().toString(),
                    tableNumber: parseInt(tableNumber),
                    items: orderItems,
                    timestamp: new Date()
                };
                setOrders([...orders, newOrder]);
            }
            else if (existingOrder) {
                setOrders(orders.map(order => order.id === existingOrder.id
                    ? { ...order, items: [...order.items, ...orderItems] }
                    : order));
            }
            setIsDialogOpen(false);
        };
        return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "table", children: "Table Number" }), _jsx(Input, { id: "table", type: "number", value: tableNumber, onChange: (e) => setTableNumber(e.target.value), disabled: type === 'update', required: true })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Add Items" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: selectedItem, onValueChange: setSelectedItem, children: [_jsx(SelectTrigger, { className: "flex-1", children: _jsx(SelectValue, { placeholder: "Select item" }) }), _jsx(SelectContent, { children: menuItems
                                                .filter(item => item.available)
                                                .map(item => (_jsxs(SelectItem, { value: item.itemId, children: [item.name, " ($", item.price, ")"] }, item.itemId))) })] }), _jsx(Input, { type: "number", value: quantity, onChange: (e) => setQuantity(e.target.value), placeholder: "Qty", min: "1", className: "w-20" }), _jsx(Button, { type: "button", variant: "outline", onClick: handleAddItem, children: "Add" })] }), _jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Special instructions..." })] }), _jsx("div", { className: "space-y-2", children: orderItems.map((item, index) => (_jsxs("div", { className: "flex justify-between items-center p-2 bg-gray-50 rounded", children: [_jsxs("span", { children: [item.quantity, "x ", item.name] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "text-red-500", onClick: () => setOrderItems(items => items.filter((_, i) => i !== index)), children: _jsx(Trash, { className: "h-4 w-4" }) })] }, index))) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: type === 'update' ? 'Update Order' : 'Create Order' })] })] }));
    };
    // Table Management Component
    const TableManagement = () => (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: tables.map((table) => (_jsxs(Card, { className: `hover:shadow-md transition-all ${table.status === 'occupied' ? 'bg-red-50' :
                table.status === 'reserved' ? 'bg-blue-50' :
                    table.status === 'cleaning' ? 'bg-yellow-50' : 'bg-green-50'}`, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: ["Table ", table.id] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-sm", children: ["Seats: ", table.seats] }), _jsxs("p", { className: "text-sm capitalize", children: ["Status: ", table.status] }), table.currentOrder && (_jsx("p", { className: "text-sm", children: "Has active order" }))] }) }), _jsx(CardFooter, { className: "justify-end", children: _jsxs(Select, { value: table.status, onValueChange: (value) => {
                            setTables(tables.map(t => t.id === table.id ? { ...t, status: value } : t));
                        }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "available", children: "Available" }), _jsx(SelectItem, { value: "occupied", children: "Occupied" }), _jsx(SelectItem, { value: "reserved", children: "Reserved" }), _jsx(SelectItem, { value: "cleaning", children: "Cleaning" })] })] }) })] }, table.id))) }));
    // Kitchen Display Component
    const KitchenDisplay = () => {
        const kitchenOrders = orders.filter(order => order.items.some(item => item.status !== 'delivered' && item.preparedKitchen));
        return (_jsx("div", { className: "grid grid-cols-1 gap-4", children: kitchenOrders.map(order => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Table ", order.tableNumber] }), _jsx("span", { className: "text-sm text-gray-500", children: order.timestamp.toLocaleTimeString() })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: order.items
                                .filter(item => item.preparedKitchen)
                                .map((item) => (_jsxs("div", { className: "flex justify-between items-center p-2 bg-gray-50 rounded", children: [_jsxs("div", { children: [_jsxs("span", { className: "font-medium", children: [item.quantity, "x ", item.name] }), item.notes && (_jsx("p", { className: "text-sm text-gray-500", children: item.notes }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-sm ${getStatusColor(item.status)}`, children: item.status }), item.status !== 'delivered' && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => updateItemStatus(order.id, item.id), children: getStatusButtonText(item.status) }))] })] }, item.id))) }) })] }, order.id))) }));
    };
    // Order Card Component
    const OrderCard = ({ order }) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: ["Table ", order.tableNumber] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: order.items.map((item) => (_jsxs("div", { className: "flex justify-between items-center p-2 rounded-lg hover:bg-gray-50", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "font-medium", children: [item.quantity, "x ", item.name] }), _jsx("span", { className: "text-sm text-gray-500", children: item.preparedKitchen ? 'Kitchen' : 'Front Station' }), item.notes && (_jsx("span", { className: "text-xs text-gray-500", children: item.notes }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-sm ${getStatusColor(item.status)}`, children: item.status }), item.status !== 'delivered' && ((userRole === 'primary_server' || userRole === 'secondary_server') && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => updateItemStatus(order.id, item.id), children: getStatusButtonText(item.status) })))] })] }, item.id))) }) }), _jsxs(CardFooter, { className: "flex justify-between text-sm text-gray-500 border-t", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), order.timestamp.toLocaleTimeString()] }), (userRole === 'primary_server' || userRole === 'secondary_server') && (_jsx(Button, { variant: "default", size: "sm", onClick: () => {
                            setSelectedOrder(order);
                            setDialogType('update');
                            setIsDialogOpen(true);
                        }, children: "Add Items" }))] })] }));
    // Header Component
    const Header = () => (_jsx("header", { className: "bg-white shadow-sm", children: _jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [_jsx("div", { className: "flex items-center space-x-4", children: _jsx("h1", { className: "text-xl font-bold", children: "Turkish Tale" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "h-5 w-5" }), alerts.length > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center", children: alerts.length }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(UserCircle, { className: "h-6 w-6" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "Staff Member" }), _jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800", children: userRole.replace('_', ' ') })] })] }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(LogOut, { className: "h-5 w-5" }) })] })] }) }));
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Header, {}), _jsxs("main", { className: "p-4 max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Dashboard" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [(userRole === 'primary_server' || userRole === 'secondary_server') && (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-blue-500 hover:bg-blue-600", onClick: () => {
                                                                setDialogType('new');
                                                                setSelectedOrder(null);
                                                            }, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "New Order"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: dialogType === 'update' ? 'Update Order' : 'Create New Order' }) }), _jsx(OrderForm, { type: dialogType, existingOrder: selectedOrder })] })] })), _jsx(Button, { variant: "outline", onClick: () => setUserRole('primary_server'), children: "Servis" }), _jsx(Button, { variant: "outline", onClick: () => setUserRole('secondary_server'), children: "Hale" }), _jsx(Button, { variant: "outline", onClick: () => setUserRole('kitchen_staff'), children: "Tom" })] })] }), _jsxs(Select, { value: activeFilter, onValueChange: setActiveFilter, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Orders" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "ready", children: "Ready" }), _jsx(SelectItem, { value: "delivered", children: "Delivered" })] })] })] }), _jsxs(Tabs, { defaultValue: "orders", className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsxs(TabsTrigger, { value: "orders", className: "flex items-center gap-2", children: [_jsx(ClipboardList, { className: "h-4 w-4" }), "Active Orders"] }), userRole === 'primary_server' && (_jsxs(_Fragment, { children: [_jsxs(TabsTrigger, { value: "menu", className: "flex items-center gap-2", children: [_jsx(Soup, { className: "h-4 w-4" }), "Menu"] }), _jsxs(TabsTrigger, { value: "tables", className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), "Tables"] })] })), userRole === 'kitchen_staff' && (_jsxs(TabsTrigger, { value: "kitchen", className: "flex items-center gap-2", children: [_jsx(ChefHat, { className: "h-4 w-4" }), "Kitchen Display"] }))] }), _jsx(TabsContent, { value: "orders", className: "space-y-4", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4", children: orders
                                        .filter(order => activeFilter === 'all' ||
                                        order.items.some(item => item.status === activeFilter))
                                        .map(order => (_jsx(OrderCard, { order: order }, order.id))) }) }), _jsx(TabsContent, { value: "menu", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Menu Management" }) }), _jsxs(CardContent, { children: [_jsx(MenuItemForm, {}), _jsx("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: menuItems.map(item => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: item.name }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-lg font-bold", children: ["$", item.price.toFixed(2)] }), _jsx("p", { className: "text-sm text-gray-500", children: item.category }), _jsxs("p", { className: "text-sm", children: ["Prepared in: ", item.preparedKitchen ? 'Kitchen' : 'Front Station'] })] }) }), _jsxs(CardFooter, { className: "justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setMenuItems(items => items.map(i => i.itemId === item.itemId
                                                                            ? { ...i, available: !i.available }
                                                                            : i)), children: item.available ? 'Mark Unavailable' : 'Mark Available' }), _jsx(Button, { variant: "ghost", className: "text-red-500", onClick: () => setMenuItems(items => items.filter(i => i.itemId !== item.itemId)), children: _jsx(Trash, { className: "h-4 w-4" }) })] })] }, item.itemId))) })] })] }) }), _jsx(TabsContent, { value: "tables", children: _jsx(TableManagement, {}) }), _jsx(TabsContent, { value: "kitchen", children: _jsx(KitchenDisplay, {}) })] })] })] }));
};
export default Layout;
