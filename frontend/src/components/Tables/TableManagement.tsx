import * as React from 'react';
import { useState } from 'react';
import { TableGrid } from './TableGrid';
import { TableForm } from './TableForm';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Table, TableStatus } from '@/types';
import { useApp } from '@/contexts/AppContext';

export const TableManagement = () => {
    const { tables } = useApp();
    const [filterStatus, setFilterStatus] = useState<TableStatus | 'all'>('all');

    const handleFilterChange = (value: string) => {
        setFilterStatus(value as TableStatus | 'all');
    };

    const activeTablesCount = tables.filter(t => t.status === 'occupied').length;
    const totalCapacity = tables.reduce((sum, table) => sum + table.seats, 0);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Active Tables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{activeTablesCount}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Total Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalCapacity} seats</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filter Tables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select value={filterStatus} onValueChange={handleFilterChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tables</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="occupied">Occupied</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>

            <TableForm />
            <TableGrid filterStatus={filterStatus} />
        </div>
    );
};

export default TableManagement;