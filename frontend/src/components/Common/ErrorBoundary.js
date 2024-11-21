import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx(AlertCircle, { className: "h-12 w-12 text-red-500 mx-auto" }), _jsx("h1", { className: "text-2xl font-bold", children: "Something went wrong" }), _jsx("p", { className: "text-gray-600", children: "We're sorry for the inconvenience" }), _jsx(Button, { onClick: () => window.location.reload(), variant: "default", children: "Refresh Page" })] }) }));
        }
        return this.props.children;
    }
}
