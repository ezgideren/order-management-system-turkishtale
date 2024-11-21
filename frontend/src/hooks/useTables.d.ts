import { Table, TableStatus } from '@/types';
export declare const useTables: () => {
    tables: Table[];
    addTable: (seats: number) => void;
    updateTableStatus: (tableId: string, status: TableStatus) => void;
    deleteTable: (tableId: string) => void;
    setTables: import("react").Dispatch<import("react").SetStateAction<Table[]>>;
};
