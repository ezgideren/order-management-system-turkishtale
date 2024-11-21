import React from 'react';
import { Order, UserRole } from '@/types';
interface OrderCardProps {
    order: Order;
    onUpdateStatus: (orderId: string, itemId: string) => void;
    onAddItems: (order: Order) => void;
    userRole: UserRole;
}
export declare const OrderCard: React.FC<OrderCardProps>;
export default OrderCard;
