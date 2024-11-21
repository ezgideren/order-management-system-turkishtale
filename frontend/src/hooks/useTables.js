import { useState } from 'react';
export const useTables = () => {
    const [tables, setTables] = useState([]);
    const addTable = (seats) => {
        const newTable = {
            id: String(Math.max(...tables.map(t => Number(t.id)), 0) + 1),
            number: tables.length + 1,
            seats,
            status: 'available',
            reservedBy: undefined,
            reservedUntil: undefined
        };
        setTables([...tables, newTable]);
    };
    const updateTableStatus = (tableId, status) => {
        setTables(tables.map(table => table.id === tableId ? { ...table, status } : table));
    };
    const deleteTable = (tableId) => {
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
