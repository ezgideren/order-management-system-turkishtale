import { OrderItemStatus } from '@/types/index';
export declare const getStatusColor: (status: OrderItemStatus) => "bg-orange-100 text-orange-800" | "bg-yellow-100 text-yellow-800" | "bg-green-100 text-green-800" | "bg-blue-100 text-blue-800" | "bg-gray-100 text-gray-800";
export declare const getStatusButtonText: (status: OrderItemStatus) => "Start Preparing" | "Mark Ready" | "Mark Delivered" | "Update Status";
export declare const getNextStatus: (status: OrderItemStatus) => OrderItemStatus;
