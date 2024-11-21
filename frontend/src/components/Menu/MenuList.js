import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { MenuItemCard } from './MenuItemCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export const MenuList = ({ items, onUpdateItem, onDeleteItem, onToggleAvailability, categories }) => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const filteredItems = React.useMemo(() => {
        return selectedCategory === 'all'
            ? items
            : items.filter(item => item.category === selectedCategory);
    }, [items, selectedCategory]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Filter by category" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), categories.map(category => (_jsx(SelectItem, { value: category, children: category }, category)))] })] }), _jsxs("span", { className: "text-sm text-muted-foreground", children: [filteredItems.length, " items"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredItems.map(item => (_jsx(MenuItemCard, { item: item, onUpdate: onUpdateItem, onDelete: onDeleteItem, onToggleAvailability: onToggleAvailability }, item.itemId))) })] }));
};
