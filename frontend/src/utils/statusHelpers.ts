// src/utils/statusHelpers.ts
import { OrderItemStatus } from '@/types';

export const getStatusColor = (status: OrderItemStatus) => {
    switch (status) {
        case 'pending':
            return 'bg-orange-100 text-orange-800';
        case 'preparing':
            return 'bg-yellow-100 text-yellow-800';
        case 'ready':
            return 'bg-green-100 text-green-800';
        case 'delivered':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusButtonText = (status: OrderItemStatus) => {
    switch (status) {
        case 'pending':
            return 'Start Preparing';
        case 'preparing':
            return 'Mark Ready';
        case 'ready':
            return 'Mark Delivered';
        default:
            return 'Update Status';
    }
};

export const getNextStatus = (status: OrderItemStatus): OrderItemStatus => {
    switch (status) {
        case 'pending':
            return 'preparing';
        case 'preparing':
            return 'ready';
        case 'ready':
            return 'delivered';
        default:
            return status;
    }
};