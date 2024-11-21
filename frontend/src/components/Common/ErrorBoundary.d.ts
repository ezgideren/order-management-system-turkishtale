import * as React from 'react';
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
export declare class ErrorBoundary extends React.Component<{
    children: React.ReactNode;
}, ErrorBoundaryState> {
    constructor(props: {
        children: React.ReactNode;
    });
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode>;
}
export {};
