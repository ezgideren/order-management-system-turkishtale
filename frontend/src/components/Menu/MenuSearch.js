import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
export const MenuSearch = ({ searchQuery, onSearch, onClear, isSearching }) => {
    return (_jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Input, { value: searchQuery, onChange: (e) => onSearch(e.target.value), placeholder: "Search menu items...", className: "pl-10" }), _jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" })] }), isSearching && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onClear, children: _jsx(X, { className: "h-4 w-4" }) }))] }));
};
