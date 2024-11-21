import { Order } from '@/types';
interface KitchenStats {
    activeOrders: number;
    urgentOrders: number;
    itemsToPrepare: number;
}
interface GroupedOrders {
    urgent: Order[];
    normal: Order[];
}
export declare const useKitchenDisplay: (orders: Order[]) => {
    kitchenOrders: Order[];
    groupedOrders: GroupedOrders;
    stats: KitchenStats;
    hasActiveOrders: boolean;
};
export {};
