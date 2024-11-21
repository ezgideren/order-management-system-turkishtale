import { useState } from 'react';
import { Table, TableStatus } from '@/types';

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);

    const addTable = (seats: number) => {
        const newTable: Table = {
            id: String(Math.max(...tables.map(t => Number(t.id)), 0) + 1),
            number: tables.length + 1,
            seats,
            status: 'available',
            reservedBy: undefined,
            reservedUntil: undefined
        };
        setTables([...tables, newTable]);
    };

    const updateTableStatus = (tableId: string, status: TableStatus) => {
        setTables(tables.map(table =>
            table.id === tableId ? { ...table, status } : table
        ));
    };

    const deleteTable = (tableId: string) => {
        setTables(tables.filter(table => table.id !== tableId));
    };

    return {
        tables,
        addTable,
        updateTableStatus,
        deleteTable,
        setTables
    };
};