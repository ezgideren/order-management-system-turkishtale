import * as React from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MenuItem, Order, OrderItem, Table, UserRole } from '../types/index';
import { useAuthContext } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

export type TableStatus = 'available' | 'occupied' | 'reserved';
export type OrderStatus = 'pending' | 'in-progress' | 'completed';

interface AppContextType {
    menuItems: MenuItem[];
    orders: Order[];
    tables: Table[];
    activeFilter: string;
    isLoading: boolean;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;

    setMenuItems: (items: MenuItem[]) => void;
    addMenuItem: (item: MenuItem) => void;
    updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;
    toggleItemAvailability: (id: string) => void;
    addTable: (seats: number) => void;

    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    updateOrderItemStatus: (orderId: string, itemId: string) => void;
    addItemsToOrder: (orderId: string, items: OrderItem[]) => void;
    deleteOrder: (orderId: string) => void;

    getTables: () => Table[];
    getAvailableTables: () => Table[];
    updateTableStatus: (tableId: string, status: TableStatus, orderId?: string) => void;

    setActiveFilter: (filter: string) => void;
    getKitchenOrders: () => Order[];
    getTableOrders: (tableId: string) => Order[];
    clearCompletedOrders: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuthContext();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [tables, setTables] = useState<Table[]>([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userRoles, setUserRoles] = useState<Record<string, UserRole>>({});
    const [currentUserRole, setCurrentUserRole] = useState<UserRole>('server');



    useEffect(() => {
        const initialTables: Table[] = [
            { id: '1', number: 1, status: 'available', seats: 2 },
            { id: '2', number: 2, status: 'available', seats: 2 },
            { id: '3', number: 3, status: 'available', seats: 4 },
            { id: '4', number: 4, status: 'available', seats: 4 },
            { id: '5', number: 5, status: 'available', seats: 6 },
            { id: '6', number: 6, status: 'available', seats: 6 }
        ];
        setTables(initialTables);

        const savedMenuItems = localStorage.getItem('menuItems');
        const savedOrders = localStorage.getItem('orders');

        if (savedMenuItems) {
            setMenuItems(JSON.parse(savedMenuItems));
        }
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addTable = useCallback((seats: number) => {
        const newId = String(tables.length + 1);
        const newTable: Table = {
            id: newId,
            number: tables.length + 1,
            seats,
            status: 'available'
        };
        setTables(prev => [...prev, newTable]);
        toast({
            title: "Success",
            description: `Table ${newTable.number} added successfully`
        });
    }, [tables, toast]);

    const addMenuItem = useCallback((item: MenuItem) => {
        setMenuItems(prev => {
            const newItems = [...prev, item];
            toast({
                title: "Success",
                description: "Menu item added successfully"
            });
            return newItems;
        });
    }, [toast]);

    const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
        setMenuItems(prev =>
            prev.map(item => item.itemId === id ? { ...item, ...updates } : item)
        );
    }, []);

    const deleteMenuItem = useCallback((id: string) => {
        setMenuItems(prev => prev.filter(item => item.itemId !== id));
    }, []);

    const toggleItemAvailability = useCallback((id: string) => {
        setMenuItems(prev => prev.map(item =>
            item.itemId === id ? { ...item, available: !item.available } : item
        ));
    }, []);

    const addOrder = useCallback((order: Order) => {
        const newOrder = {
            ...order,
            tableNumber: String(order.tableNumber)
        };
        setOrders(prev => [...prev, newOrder]);
    }, []);

    const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, status };
                if (status === 'completed') {
                    setTables(tables =>
                        tables.map(table =>
                            table.id === order.tableNumber
                                ? { ...table, status: 'available' as TableStatus, currentOrderId: undefined }
                                : table
                        )
                    );
                }
                return updatedOrder;
            }
            return order;
        }));
    }, []);

    const updateOrderItemStatus = useCallback((orderId: string, itemId: string) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    items: order.items.map(item => {
                        if (item.id === itemId) {
                            const nextStatus = item.status === 'pending' ? 'preparing' :
                                item.status === 'preparing' ? 'ready' :
                                    item.status === 'ready' ? 'delivered' : item.status;
                            return { ...item, status: nextStatus };
                        }
                        return item;
                    })
                };
            }
            return order;
        }));
    }, []);

    const addItemsToOrder = useCallback((orderId: string, newItems: OrderItem[]) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId
                ? { ...order, items: [...order.items, ...newItems] }
                : order
        ));
    }, []);

    const deleteOrder = useCallback((orderId: string) => {
        setOrders(prev => {
            const order = prev.find(o => o.id === orderId);
            if (order) {
                setTables(tables =>
                    tables.map(table =>
                        table.number.toString() === order.tableNumber
                            ? { ...table, status: 'available' as TableStatus, currentOrderId: undefined }
                            : table
                    )
                );
            }
            return prev.filter(o => o.id !== orderId);
        });
    }, []);

    const getTables = useCallback(() => tables, [tables]);

    const getAvailableTables = useCallback(() =>
            tables.filter(table => table.status === 'available'),
        [tables]);

    const updateTableStatus = useCallback((tableId: string, status: TableStatus, orderId?: string) => {
        setTables(prev => prev.map(table =>
            table.id === tableId
                ? { ...table, status, currentOrderId: orderId }
                : table
        ));
    }, []);

    const getKitchenOrders = useCallback(() =>
            orders.filter(order =>
                order.items.some(item =>
                    item.preparedKitchen && item.status !== 'delivered'
                )
            ),
        [orders]);

    const getTableOrders = useCallback((tableId: string) =>
            orders.filter(order =>
                order.tableNumber === tableId
            ),
        [orders]);

    const clearCompletedOrders = useCallback(() => {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        setOrders(prev =>
            prev.filter(order =>
                new Date(order.timestamp) > twentyFourHoursAgo ||
                !order.items.every(item => item.status === 'delivered')
            )
        );
    }, []);


    const setUserRole = useCallback((role: UserRole) => {
        setCurrentUserRole(role);
        toast({
            title: "Success",
            description: `User role updated successfully`
        });
    }, [toast]);


    const getUserRole = useCallback((userId: string) => {
        return userRoles[userId] || 'server';
    }, [userRoles]);


    const value = {
        menuItems,
        orders,
        tables,
        activeFilter,
        isLoading,
        userRole: currentUserRole,
        setUserRole,
        setMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        addTable,
        addOrder,
        updateOrderStatus,
        updateOrderItemStatus,
        addItemsToOrder,
        deleteOrder,
        getTables,
        getAvailableTables,
        updateTableStatus,
        setActiveFilter,
        getKitchenOrders,
        getTableOrders,
        clearCompletedOrders
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};