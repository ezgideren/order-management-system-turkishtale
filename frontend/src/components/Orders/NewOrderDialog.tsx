import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash, AlertCircle } from 'lucide-react';
import { Order, OrderItem, MenuItem } from '@/types';
import { useApp } from '@/contexts/AppContext';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface NewOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedOrder: Order | null;
    onAddOrder: (order: Order) => void;
    onUpdateOrder: (orderId: string, items: OrderItem[]) => void;
}

interface OrderItemForm {
    menuItemId: string;
    quantity: number;
    notes: string;
}

export const NewOrderDialog: React.FC<NewOrderDialogProps> = ({
                                                                  open,
                                                                  onOpenChange,
                                                                  selectedOrder,
                                                                  onAddOrder,
                                                                  onUpdateOrder
                                                              }) => {
    const { menuItems = [], tables = [] } = useApp();
    const [tableNumber, setTableNumber] = React.useState<string>('');
    const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);
    const [currentItem, setCurrentItem] = React.useState<OrderItemForm>({
        menuItemId: '',
        quantity: 1,
        notes: ''
    });
    const [error, setError] = React.useState<string>('');

    // Reset form when dialog opens/closes
    React.useEffect(() => {
        if (open) {
            if (selectedOrder) {
                setTableNumber(selectedOrder.tableNumber.toString());
            } else {
                setTableNumber('');
            }
            setOrderItems([]);
            setCurrentItem({ menuItemId: '', quantity: 1, notes: '' });
            setError('');
        }
    }, [open, selectedOrder]);

    const availableMenuItems = React.useMemo(() =>
            menuItems?.filter(item => item.available) ?? [],
        [menuItems]);

    const availableTables = React.useMemo(() =>
    tables?.filter(table => table.seats > 0) ?? [],
        [tables]);

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

        const newItem: OrderItem = {
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

    const handleRemoveItem = (itemId: string) => {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));
    };

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => {
            const menuItem = menuItems?.find(mi => mi.itemId === item.itemId);
            return total + (menuItem?.price || 0) * item.quantity;
        }, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
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
        } else {
            const newOrder: Order = {
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {selectedOrder ? 'Add Items to Order' : 'Create New Order'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Table Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="table">Table Number</Label>
                        <Select
                            value={tableNumber}
                            onValueChange={setTableNumber}
                            disabled={!!selectedOrder}
                        >
                            <SelectTrigger id="table">
                                <SelectValue placeholder="Select table" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTables.map(table => (
                                    <SelectItem
                                        key={table.number}
                                        value={table.id.toString()}
                                    >
                                        Table {table.id} ({table.seats} seats)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Item Selection */}
                    <div className="space-y-4">
                        <Label>Add Items</Label>
                        <div className="flex gap-2">
                            <Select
                                value={currentItem.menuItemId}
                                onValueChange={value => setCurrentItem(prev => ({
                                    ...prev,
                                    menuItemId: value
                                }))}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select menu item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableMenuItems.map(item => (
                                        <SelectItem key={item.itemId} value={item.itemId}>
                                            {item.name} (${item.price.toFixed(2)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                type="number"
                                value={currentItem.quantity}
                                onChange={e => setCurrentItem(prev => ({
                                    ...prev,
                                    quantity: parseInt(e.target.value) || 1
                                }))}
                                min="1"
                                className="w-20"
                                placeholder="Qty"
                            />

                            <Button
                                type="button"
                                onClick={handleAddItem}
                                variant="secondary"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <Textarea
                            value={currentItem.notes}
                            onChange={e => setCurrentItem(prev => ({
                                ...prev,
                                notes: e.target.value
                            }))}
                            placeholder="Special instructions or notes..."
                            className="h-20"
                        />
                    </div>

                    {/* Order Items List */}
                    {orderItems.length > 0 && (
                        <Card>
                            <CardContent className="pt-6 space-y-2">
                                {orderItems.map((item) => {
                                    const menuItem = menuItems.find(mi => mi.itemId === item.itemId);
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg group"
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                    <Badge variant="outline">
                                                        ${((menuItem?.price || 0) * item.quantity).toFixed(2)}
                                                    </Badge>
                                                </div>
                                                {item.notes && (
                                                    <span className="text-sm text-gray-500">
                                                        {item.notes}
                                                    </span>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <Trash className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    );
                                })}
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center font-medium">
                                        <span>Total</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Error Display */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Dialog Actions */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {selectedOrder ? 'Add Items' : 'Create Order'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};