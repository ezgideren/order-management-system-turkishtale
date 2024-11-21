import React from 'react';
import { Table, TableStatus } from '@/types';
interface TableCardProps extends Table {
    onStatusChange: (status: TableStatus) => void;
}
export declare const TableCard: React.FC<TableCardProps>;
export {};
