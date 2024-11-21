import { jsx as _jsx } from "react/jsx-runtime";
import { TableCard } from './TableCard';
import { useApp } from "@/contexts/AppContext";
export const TableGrid = ({ filterStatus }) => {
    const { tables, updateTableStatus } = useApp();
    const filteredTables = filterStatus === 'all'
        ? tables
        : tables.filter(table => table.status === filterStatus);
    const handleStatusChange = (tableId, newStatus) => {
        updateTableStatus(tableId, newStatus);
    };
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredTables.map((table) => (_jsx(TableCard, { ...table, onStatusChange: (status) => handleStatusChange(String(table.id), status) }, String(table.id)))) }));
};
