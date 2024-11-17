import { useState } from 'react';
import { Table } from '@/types';

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);

    const addTable = (seats: number) => {
        const newTable: Table = {
            id: Math.max(...tables.map(t => t.id), 0) + 1,
            seats,
            status: 'available',
            position: { x: 0, y: 0 },
            rotation: 0
        };
        setTables([...tables, newTable]);
    };

    const updateTableStatus = (tableId: number, status: Table['status']) => {
        setTables(tables.map(table =>
            table.id === tableId ? { ...table, status } : table
        ));
    };

    const deleteTable = (tableId: number) => {
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