import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useApp } from '@/contexts/AppContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { MENU_CATEGORIES } from '../../lib/constants';
export const MenuForm = ({ onAddMenuItem, categories }) => {
    const { menuItems, setMenuItems } = useApp();
    const [error, setError] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        price: '',
        category: '',
        preparedKitchen: true
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        // Validation
        if (!formData.name.trim()) {
            setError('Please enter an item name');
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('Please enter a valid price');
            return;
        }
        if (!formData.category) {
            setError('Please select a category');
            return;
        }
        const newItem = {
            itemId: Date.now().toString(),
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            category: formData.category,
            preparedKitchen: formData.preparedKitchen,
            available: true
        };
        setMenuItems([...menuItems, newItem]);
        // Reset form
        setFormData({
            name: '',
            price: '',
            category: '',
            preparedKitchen: true
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Item Name" }), _jsx(Input, { id: "name", value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), placeholder: "Enter item name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "price", children: "Price" }), _jsx(Input, { id: "price", type: "number", step: "0.01", value: formData.price, onChange: (e) => setFormData(prev => ({ ...prev, price: e.target.value })), placeholder: "0.00" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "category", children: "Category" }), _jsxs(Select, { value: formData.category, onValueChange: (value) => setFormData(prev => ({ ...prev, category: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select category" }) }), _jsx(SelectContent, { children: MENU_CATEGORIES.map(category => (_jsx(SelectItem, { value: category, children: category }, category))) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "preparedKitchen", checked: formData.preparedKitchen, onChange: (e) => setFormData(prev => ({ ...prev, preparedKitchen: e.target.checked })), className: "rounded border-gray-300" }), _jsx(Label, { htmlFor: "preparedKitchen", children: "Prepared in Kitchen" })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsx(Button, { type: "submit", children: "Add Menu Item" })] }));
};
