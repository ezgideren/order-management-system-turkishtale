import React from 'react';
import { Table, TableStatus } from '@/types';
import { TableCard } from './TableCard';
import {useApp} from "@/contexts/AppContext";

interface TableGridProps {
    filterStatus: TableStatus | 'all';
}

export const TableGrid: React.FC<TableGridProps> = ({ filterStatus }) => {
    const { tables, updateTableStatus } = useApp();

    const filteredTables = filterStatus === 'all'
        ? tables
        : tables.filter(table => table.status === filterStatus);

    const handleStatusChange = (tableId: string, newStatus: TableStatus) => {
        updateTableStatus(tableId, newStatus);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTables.map((table) => (
                <TableCard
                    key={String(table.id)}
                    {...table}
                    onStatusChange={(status) => handleStatusChange(String(table.id), status)}
                />
            ))}
        </div>
    );
};
