import { jsx as _jsx } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
export const LoadingScreen = () => {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }));
};
