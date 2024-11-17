import React from 'react';
import { Table } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { TableCard } from './TableCard';

interface TableGridProps {
    filterStatus: Table['status'] | 'all';
}

export const TableGrid: React.FC<TableGridProps> = ({ filterStatus }) => {
    const { tables } = useApp();

    const filteredTables = React.useMemo(() => {
        return filterStatus === 'all'
            ? tables
            : tables.filter(table => table.status === filterStatus);
    }, [tables, filterStatus]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTables.map((table) => (
                <TableCard key={table.id} table={table} />
            ))}
        </div>
    );
};
