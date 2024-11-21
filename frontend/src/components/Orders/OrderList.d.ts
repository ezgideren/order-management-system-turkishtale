import React from 'react';
import { Order } from '@/types/index';
interface OrderListProps {
    activeFilter: string;
    onAddItems: (order: Order) => void;
}
export declare const OrderList: React.FC<OrderListProps>;
export {};
