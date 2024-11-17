// src/contexts/AppContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MenuItem, Order, OrderItem, Table, UserRole } from '@/types';
import { useAuthContext } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface AppContextType {
    // States
    menuItems: MenuItem[];
    orders: Order[];
    tables: Table[];
    activeFilter: string;
    userRole: UserRole;
    isLoading: boolean;

    // Menu Management
    setMenuItems: (items: MenuItem[]) => void;
    addMenuItem: (item: MenuItem) => void;
    updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;
    toggleItemAvailability: (id: string) => void;

    // Order Management
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: string) => void;
    updateOrderItemStatus: (orderId: string, itemId: string) => void;
    addItemsToOrder: (orderId: string, items: OrderItem[]) => void;
    deleteOrder: (orderId: string) => void;

    // Table Management
    getTables: () => Table[];
    getAvailableTables: () => Table[];
    updateTableStatus: (tableId: string, status: string, orderId?: string) => void;

    // Filters & Utils
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

    // Initialize default data
    useEffect(() => {
        // Initialize tables
        setTables([
            { id: '1', number: 1, status: 'available', seats: 2 },
            { id: '2', number: 2, status: 'available', seats: 2 },
            { id: '3', number: 3, status: 'available', seats: 4 },
            { id: '4', number: 4, status: 'available', seats: 4 },
            { id: '5', number: 5, status: 'available', seats: 6 },
            { id: '6', number: 6, status: 'available', seats: 6 }
        ]);

        // Load saved data from localStorage if available
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

    // Save data to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Menu Management
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

    // Order Management
    const addOrder = useCallback((order: Order) => {
        setOrders(prev => {
            const newOrders = [order, ...prev];
            // Update table status
            setTables(tables =>
                tables.map(table =>
                    table.number === order.tableNumber
                        ? { ...table, status: 'occupied', currentOrderId: order.id }
                        : table
                )
            );
            return newOrders;
        });
    }, []);

    const updateOrderStatus = useCallback((orderId: string, status: string) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, status };
                // If order is completed, update table status
                if (status === 'completed') {
                    setTables(tables =>
                        tables.map(table =>
                            table.number === order.tableNumber
                                ? { ...table, status: 'available', currentOrderId: undefined }
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
                            const nextStatus =
                                item.status === 'pending' ? 'preparing' :
                                    item.status === 'preparing' ? 'ready' :
                                        item.status === 'ready' ? 'delivered' :
                                            item.status;
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
                        table.number === order.tableNumber
                            ? { ...table, status: 'available', currentOrderId: undefined }
                            : table
                    )
                );
            }
            return prev.filter(o => o.id !== orderId);
        });
    }, []);

    // Table Management
    const getTables = useCallback(() => tables, [tables]);

    const getAvailableTables = useCallback(() =>
            tables.filter(table => table.status === 'available'),
        [tables]);

    const updateTableStatus = useCallback((tableId: string, status: string, orderId?: string) => {
        setTables(prev => prev.map(table =>
            table.id === tableId
                ? { ...table, status, currentOrderId: orderId }
                : table
        ));
    }, []);

    // Utility Functions
    const getKitchenOrders = useCallback(() =>
            orders.filter(order =>
                order.items.some(item =>
                    item.preparedKitchen && item.status !== 'delivered'
                )
            ),
        [orders]);

    const getTableOrders = useCallback((tableId: string) =>
            orders.filter(order =>
                order.tableNumber === parseInt(tableId)
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

    const value = {
        // States
        menuItems,
        orders,
        tables,
        activeFilter,
        userRole: user?.role as UserRole,
        isLoading,

        // Menu Management
        setMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,

        // Order Management
        addOrder,
        updateOrderStatus,
        updateOrderItemStatus,
        addItemsToOrder,
        deleteOrder,

        // Table Management
        getTables,
        getAvailableTables,
        updateTableStatus,

        // Filters & Utils
        setActiveFilter,
        getKitchenOrders,
        getTableOrders,
        clearCompletedOrders
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};