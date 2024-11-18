import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table } from '../../types/index';
import { useApp } from '@/contexts/AppContext';
import { Users, Coffee, CalendarClock, Trash, Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface TableCardProps {
    table: Table;
}

export const TableCard: React.FC<TableCardProps> = ({ table }) => {
    const { setTables, orders } = useApp();
    const [isUpdating, setIsUpdating] = React.useState(false);

    const currentOrder = React.useMemo(() => {
        return orders.find(order => order.id === table.currentOrder);
    }, [orders, table.currentOrder]);

    const statusColors = {
        available: 'bg-green-50 border-green-200',
        occupied: 'bg-red-50 border-red-200',
        reserved: 'bg-blue-50 border-blue-200',
        cleaning: 'bg-yellow-50 border-yellow-200'
    };

    const statusIcons = {
        available: <Users className="h-5 w-5 text-green-500" />,
        occupied: <Coffee className="h-5 w-5 text-red-500" />,
        reserved: <CalendarClock className="h-5 w-5 text-blue-500" />,
        cleaning: <Loader2 className="h-5 w-5 text-yellow-500" />
    };

    const handleStatusChange = async (newStatus: Table['status']) => {
        setIsUpdating(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            setTables(prevTables =>
                prevTables.map(t =>
                    t.id === table.id
                        ? { ...t, status: newStatus }
                        : t
                )
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteTable = () => {
        if (table.status === 'occupied') {
            return; // Don't allow deletion of occupied tables
        }
        setTables(prevTables => prevTables.filter(t => t.id !== table.id));
    };

    return (
        <Card className={`${statusColors[table.status]} transition-all`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                        Table {table.id}
                        {statusIcons[table.status]}
                    </CardTitle>
                    {table.currentOrder && (
                        <Badge variant="secondary">Has Order</Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Seats:</span>
                        <span>{table.seats}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="capitalize">{table.status}</span>
                    </div>
                    {currentOrder && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Order Items:</span>
                            <span>{currentOrder.items.length}</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="justify-between">
                <Select
                    value={table.status}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                    </SelectContent>
                </Select>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="text-red-500"
                            disabled={table.status === 'occupied'}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Table</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete Table {table.id}? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteTable}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};
