import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Soup, ClipboardList, Plus, Bell, UserCircle, LogOut, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Types
type UserRole = 'primary_server' | 'secondary_server' | 'kitchen_staff';

interface MenuItem {
    itemId: string;
    name: string;
    price: number;
    category: string;
    preparedKitchen: boolean;
    available: boolean;
}

interface OrderItem {
    id: string;
    itemId: string;
    name: string;
    quantity: number;
    notes?: string;
    status: 'pending' | 'ready' | 'delivered';
    preparedKitchen: boolean;
}

interface Order {
    id: string;
    tableNumber: number;
    items: OrderItem[];
    timestamp: Date;
}

interface Table {
    id: number;
    seats: number;
    status: 'available' | 'occupied' | 'reserved' | 'cleaning';
    position: { x: number; y: number };
    rotation?: number;
    currentOrder?: string;
}

const Layout = () => {
    const [userRole, setUserRole] = useState<UserRole>('primary_server');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'new' | 'update'>('new');

    // Menu Items State
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
    const [orders, setOrders] = useState<Order[]>([
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
    const [tables, setTables] = useState<Table[]>([
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

    const updateItemStatus = (orderId: string, itemId: string) => {
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

    const getStatusColor = (status: string) => {
        const colors = {
            'pending': 'text-orange-500',
            'ready': 'text-green-500',
            'delivered': 'text-gray-500'
        };
        return colors[status as keyof typeof colors] || 'text-gray-500';
    };

    const getStatusButtonText = (status: string) => {
        const text = {
            'pending': 'Mark Ready',
            'ready': 'Mark Delivered',
            'delivered': 'Delivered'
        };
        return text[status as keyof typeof text] || status;
    };

    // Menu Item Form Component
    const MenuItemForm = () => {
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [category, setCategory] = useState('');
        const [preparedKitchen, setPreparedKitchen] = useState(true);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const newItem: MenuItem = {
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

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Starters">Starters</SelectItem>
                            <SelectItem value="Mains">Mains</SelectItem>
                            <SelectItem value="Desserts">Desserts</SelectItem>
                            <SelectItem value="Drinks">Drinks</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="preparedKitchen"
                        checked={preparedKitchen}
                        onChange={(e) => setPreparedKitchen(e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <Label htmlFor="preparedKitchen">Prepared in Kitchen</Label>
                </div>

                <Button type="submit">Add Menu Item</Button>
            </form>
        );
    };

    // Order Form Component
    const OrderForm = ({ type, existingOrder = null }: { type: 'new' | 'update', existingOrder: Order | null }) => {
        const [tableNumber, setTableNumber] = useState(existingOrder?.tableNumber.toString() || '');
        const [selectedItem, setSelectedItem] = useState('');
        const [quantity, setQuantity] = useState('1');
        const [notes, setNotes] = useState('');
        const [orderItems, setOrderItems] = useState<OrderItem[]>(existingOrder?.items || []);

        const handleAddItem = () => {
            const menuItem = menuItems.find(item => item.itemId === selectedItem);
            if (menuItem) {
                const newItem: OrderItem = {
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

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (type === 'new') {
                const newOrder: Order = {
                    id: Date.now().toString(),
                    tableNumber: parseInt(tableNumber),
                    items: orderItems,
                    timestamp: new Date()
                };
                setOrders([...orders, newOrder]);
            } else if (existingOrder) {
                setOrders(orders.map(order =>
                    order.id === existingOrder.id
                        ? { ...order, items: [...order.items, ...orderItems] }
                        : order
                ));
            }
            setIsDialogOpen(false);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="table">Table Number</Label>
                    <Input
                        id="table"
                        type="number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        disabled={type === 'update'}
                        required
                    />
                </div>

                <div className="space-y-4">
                    <Label>Add Items</Label>
                    <div className="flex gap-2">
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select item" />
                            </SelectTrigger>
                            <SelectContent>
                                {menuItems
                                    .filter(item => item.available)
                                    .map(item => (
                                        <SelectItem key={item.itemId} value={item.itemId}>
                                            {item.name} (${item.price})
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Qty"
                            min="1"
                            className="w-20"
                        />
                        <Button type="button" variant="outline" onClick={handleAddItem}>
                            Add
                        </Button>
                    </div>
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Special instructions..."
                    />
                </div>

                <div className="space-y-2">
                    {orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>{item.quantity}x {item.name}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => setOrderItems(items =>
                                    items.filter((_, i) => i !== index)
                                )}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {type === 'update' ? 'Update Order' : 'Create Order'}
                    </Button>
                </div>
            </form>
        );
    };

    // Table Management Component
    const TableManagement = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
                <Card
                    key={table.id}
                    className={`hover:shadow-md transition-all ${
                        table.status === 'occupied' ? 'bg-red-50' :
                            table.status === 'reserved' ? 'bg-blue-50' :
                                table.status === 'cleaning' ? 'bg-yellow-50' : 'bg-green-50'
                    }`}
                >
                    <CardHeader>
                        <CardTitle className="text-lg">Table {table.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-sm">Seats: {table.seats}</p>
                            <p className="text-sm capitalize">Status: {table.status}</p>
                            {table.currentOrder && (
                                <p className="text-sm">Has active order</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Select
                            value={table.status}
                            onValueChange={(value: Table['status']) => {
                                setTables(tables.map(t =>
                                    t.id === table.id ? { ...t, status: value } : t
                                ));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="occupied">Occupied</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                                <SelectItem value="cleaning">Cleaning</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

// Kitchen Display Component
            const KitchenDisplay = () => {
                const kitchenOrders = orders.filter(order =>
                    order.items.some(item =>
                        item.status !== 'delivered' && item.preparedKitchen
                    )
                );
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {kitchenOrders.map(order => (
                            <Card key={order.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Table {order.tableNumber}</CardTitle>
                                        <span className="text-sm text-gray-500">
                                    {order.timestamp.toLocaleTimeString()}
                                </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {order.items
                                            .filter(item => item.preparedKitchen)
                                            .map((item) => (
                                                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                    <div>
                                                <span className="font-medium">
                                                    {item.quantity}x {item.name}
                                                </span>
                                                        {item.notes && (
                                                            <p className="text-sm text-gray-500">{item.notes}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                <span className={`text-sm ${getStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                                        {item.status !== 'delivered' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => updateItemStatus(order.id, item.id)}
                                                            >
                                                                {getStatusButtonText(item.status)}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            };

            // Order Card Component
            const OrderCard = ({ order }: { order: Order }) => (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.quantity}x {item.name}</span>
                                        <span className="text-sm text-gray-500">
                                    {item.preparedKitchen ? 'Kitchen' : 'Front Station'}
                                </span>
                                        {item.notes && (
                                            <span className="text-xs text-gray-500">{item.notes}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                <span className={`text-sm ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                                        {item.status !== 'delivered' && (
                                            (userRole === 'primary_server' || userRole === 'secondary_server') && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateItemStatus(order.id, item.id)}
                                                >
                                                    {getStatusButtonText(item.status)}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm text-gray-500 border-t">
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {order.timestamp.toLocaleTimeString()}
                        </div>
                        {(userRole === 'primary_server' || userRole === 'secondary_server') && (
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setDialogType('update');
                                    setIsDialogOpen(true);
                                }}
                            >
                                Add Items
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            );

            // Header Component
            const Header = () => (
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-bold">Turkish Tale</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {alerts.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {alerts.length}
                            </span>
                                )}
                            </Button>

                            <div className="flex items-center space-x-2">
                                <UserCircle className="h-6 w-6" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">Staff Member</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                {userRole.replace('_', ' ')}
                            </span>
                                </div>
                            </div>

                            <Button variant="ghost" size="icon">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </header>
            );

            return (
                <div className="min-h-screen bg-gray-50">
                    <Header />

                    <main className="p-4 max-w-7xl mx-auto">
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <h2 className="text-2xl font-bold">Dashboard</h2>
                                <div className="flex flex-wrap gap-2">
                                    {(userRole === 'primary_server' || userRole === 'secondary_server') && (
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="bg-blue-500 hover:bg-blue-600"
                                                    onClick={() => {
                                                        setDialogType('new');
                                                        setSelectedOrder(null);
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    New Order
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {dialogType === 'update' ? 'Update Order' : 'Create New Order'}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <OrderForm
                                                    type={dialogType}
                                                    existingOrder={selectedOrder}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                    <Button variant="outline" onClick={() => setUserRole('primary_server')}>
                                        Servis
                                    </Button>
                                    <Button variant="outline" onClick={() => setUserRole('secondary_server')}>
                                        Hale
                                    </Button>
                                    <Button variant="outline" onClick={() => setUserRole('kitchen_staff')}>
                                        Tom
                                    </Button>
                                </div>
                            </div>

                            <Select value={activeFilter} onValueChange={setActiveFilter}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Orders</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="ready">Ready</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Tabs defaultValue="orders" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="orders" className="flex items-center gap-2">
                                    <ClipboardList className="h-4 w-4" />
                                    Active Orders
                                </TabsTrigger>
                                {userRole === 'primary_server' && (
                                    <>
                                        <TabsTrigger value="menu" className="flex items-center gap-2">
                                            <Soup className="h-4 w-4" />
                                            Menu
                                        </TabsTrigger>
                                        <TabsTrigger value="tables" className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Tables
                                        </TabsTrigger>
                                    </>
                                )}
                                {userRole === 'kitchen_staff' && (
                                    <TabsTrigger value="kitchen" className="flex items-center gap-2">
                                        <ChefHat className="h-4 w-4" />
                                        Kitchen Display
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="orders" className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {orders
                                        .filter(order =>
                                            activeFilter === 'all' ||
                                            order.items.some(item => item.status === activeFilter)
                                        )
                                        .map(order => (
                                            <OrderCard key={order.id} order={order} />
                                        ))
                                    }
                                </div>
                            </TabsContent>

                            <TabsContent value="menu">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Menu Management</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <MenuItemForm />
                                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {menuItems.map(item => (
                                                <Card key={item.itemId}>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">{item.name}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-2">
                                                            <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                                                            <p className="text-sm text-gray-500">{item.category}</p>
                                                            <p className="text-sm">
                                                                Prepared in: {item.preparedKitchen ? 'Kitchen' : 'Front Station'}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="justify-between">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setMenuItems(items =>
                                                                items.map(i => i.itemId === item.itemId
                                                                    ? { ...i, available: !i.available }
                                                                    : i
                                                                )
                                                            )}
                                                        >
                                                            {item.available ? 'Mark Unavailable' : 'Mark Available'}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            className="text-red-500"
                                                            onClick={() => setMenuItems(items =>
                                                                items.filter(i => i.itemId !== item.itemId)
                                                            )}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="tables">
                                <TableManagement />
                            </TabsContent>

                            <TabsContent value="kitchen">
                                <KitchenDisplay />
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            );
        };

        export default Layout;