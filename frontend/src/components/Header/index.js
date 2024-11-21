import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const Header = ({ userRole, alertCount }) => (_jsx("header", { className: "bg-white shadow-sm", children: _jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [_jsx("div", { className: "flex items-center space-x-4", children: _jsx("h1", { className: "text-xl font-bold", children: "Turkish Tale" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "h-5 w-5" }), alertCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center", children: alertCount }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(UserCircle, { className: "h-6 w-6" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "Staff Member" }), _jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800", children: userRole.replace('_', ' ') })] })] }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(LogOut, { className: "h-5 w-5" }) })] })] }) }));