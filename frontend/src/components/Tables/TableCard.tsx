import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableStatus } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TableCardProps extends Table {
    onStatusChange: (status: TableStatus) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
                                                        number,
                                                        seats,
                                                        status,
                                                        onStatusChange
                                                    }) => {
    const getStatusColor = (status: TableStatus) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'occupied':
                return 'bg-red-100 text-red-800';
            case 'reserved':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Table {number}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Capacity</span>
                    <span className="font-medium">{seats} seats</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
};