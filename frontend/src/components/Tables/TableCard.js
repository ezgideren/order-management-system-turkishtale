import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export const TableCard = ({ number, seats, status, onStatusChange }) => {
    const getStatusColor = (status) => {
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
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: ["Table ", number] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Capacity" }), _jsxs("span", { className: "font-medium", children: [seats, " seats"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Status" }), _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`, children: status.charAt(0).toUpperCase() + status.slice(1) })] }), _jsxs(Select, { value: status, onValueChange: onStatusChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "available", children: "Available" }), _jsx(SelectItem, { value: "occupied", children: "Occupied" }), _jsx(SelectItem, { value: "reserved", children: "Reserved" })] })] })] })] }));
};
