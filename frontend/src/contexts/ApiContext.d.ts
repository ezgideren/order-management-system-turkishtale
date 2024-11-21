import * as React from 'react';
interface ApiContextType {
    api: {
        get: <T>(url: string) => Promise<T>;
        post: <T>(url: string, data: any) => Promise<T>;
        put: <T>(url: string, data: any) => Promise<T>;
        patch: <T>(url: string, data?: any) => Promise<T>;
        delete: (url: string) => Promise<void>;
    };
}
export declare const ApiProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useApi: () => ApiContextType;
export {};
