import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TableGrid } from './TableGrid';
import { TableForm } from './TableForm';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useApp } from '@/contexts/AppContext';
export const TableManagement = () => {
    const { tables } = useApp();
    const [filterStatus, setFilterStatus] = useState('all');
    const handleFilterChange = (value) => {
        setFilterStatus(value);
    };
    const activeTablesCount = tables.filter(t => t.status === 'occupied').length;
    const totalCapacity = tables.reduce((sum, table) => sum + table.seats, 0);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Active Tables" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-2xl font-bold", children: activeTablesCount }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Total Capacity" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [totalCapacity, " seats"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Filter Tables" }) }), _jsx(CardContent, { children: _jsxs(Select, { value: filterStatus, onValueChange: handleFilterChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Tables" }), _jsx(SelectItem, { value: "available", children: "Available" }), _jsx(SelectItem, { value: "occupied", children: "Occupied" }), _jsx(SelectItem, { value: "reserved", children: "Reserved" })] })] }) })] })] }), _jsx(TableForm, {}), _jsx(TableGrid, { filterStatus: filterStatus })] }));
};
export default TableManagement;
