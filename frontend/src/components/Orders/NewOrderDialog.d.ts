import React from 'react';
import { Order, OrderItem } from '@/types';
interface NewOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedOrder: Order | null;
    onAddOrder: (order: Order) => void;
    onUpdateOrder: (orderId: string, items: OrderItem[]) => void;
}
export declare const NewOrderDialog: React.FC<NewOrderDialogProps>;
export {};
