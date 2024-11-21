import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useApp } from '@/contexts/AppContext';
export const TableForm = () => {
    const { tables, addTable } = useApp();
    const [seats, setSeats] = React.useState('');
    const [error, setError] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const seatCount = Number(seats);
        if (!seatCount || seatCount < 1 || seatCount > 12) {
            setError('Please enter a valid number of seats (1-12)');
            return;
        }
        addTable(seatCount);
        setSeats('');
        setError('');
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Add New Table" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "seats", children: "Number of Seats" }), _jsx(Input, { id: "seats", type: "number", value: seats, onChange: (e) => setSeats(e.target.value), min: 1, max: 12 }), error && (_jsx("span", { className: "text-sm text-red-500", children: error }))] }), _jsx(Button, { type: "submit", children: "Add Table" })] }) })] }));
};
