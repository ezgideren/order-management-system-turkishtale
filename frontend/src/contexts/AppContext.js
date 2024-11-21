import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';
export const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const { user } = useAuthContext();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userRoles, setUserRoles] = useState({});
    const [currentUserRole, setCurrentUserRole] = useState('server');
    useEffect(() => {
        const initialTables = [
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
    const addTable = useCallback((seats) => {
        const newId = String(tables.length + 1);
        const newTable = {
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
    const addMenuItem = useCallback((item) => {
        setMenuItems(prev => {
            const newItems = [...prev, item];
            toast({
                title: "Success",
                description: "Menu item added successfully"
            });
            return newItems;
        });
    }, [toast]);
    const updateMenuItem = useCallback((id, updates) => {
        setMenuItems(prev => prev.map(item => item.itemId === id ? { ...item, ...updates } : item));
    }, []);
    const deleteMenuItem = useCallback((id) => {
        setMenuItems(prev => prev.filter(item => item.itemId !== id));
    }, []);
    const toggleItemAvailability = useCallback((id) => {
        setMenuItems(prev => prev.map(item => item.itemId === id ? { ...item, available: !item.available } : item));
    }, []);
    const addOrder = useCallback((order) => {
        const newOrder = {
            ...order,
            tableNumber: String(order.tableNumber)
        };
        setOrders(prev => [...prev, newOrder]);
    }, []);
    const updateOrderStatus = useCallback((orderId, status) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, status };
                if (status === 'completed') {
                    setTables(tables => tables.map(table => table.id === order.tableNumber
                        ? { ...table, status: 'available', currentOrderId: undefined }
                        : table));
                }
                return updatedOrder;
            }
            return order;
        }));
    }, []);
    const updateOrderItemStatus = useCallback((orderId, itemId) => {
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
    const addItemsToOrder = useCallback((orderId, newItems) => {
        setOrders(prev => prev.map(order => order.id === orderId
            ? { ...order, items: [...order.items, ...newItems] }
            : order));
    }, []);
    const deleteOrder = useCallback((orderId) => {
        setOrders(prev => {
            const order = prev.find(o => o.id === orderId);
            if (order) {
                setTables(tables => tables.map(table => table.number.toString() === order.tableNumber
                    ? { ...table, status: 'available', currentOrderId: undefined }
                    : table));
            }
            return prev.filter(o => o.id !== orderId);
        });
    }, []);
    const getTables = useCallback(() => tables, [tables]);
    const getAvailableTables = useCallback(() => tables.filter(table => table.status === 'available'), [tables]);
    const updateTableStatus = useCallback((tableId, status, orderId) => {
        setTables(prev => prev.map(table => table.id === tableId
            ? { ...table, status, currentOrderId: orderId }
            : table));
    }, []);
    const getKitchenOrders = useCallback(() => orders.filter(order => order.items.some(item => item.preparedKitchen && item.status !== 'delivered')), [orders]);
    const getTableOrders = useCallback((tableId) => orders.filter(order => order.tableNumber === tableId), [orders]);
    const clearCompletedOrders = useCallback(() => {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        setOrders(prev => prev.filter(order => new Date(order.timestamp) > twentyFourHoursAgo ||
            !order.items.every(item => item.status === 'delivered')));
    }, []);
    const setUserRole = useCallback((role) => {
        setCurrentUserRole(role);
        toast({
            title: "Success",
            description: `User role updated successfully`
        });
    }, [toast]);
    const getUserRole = useCallback((userId) => {
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
    return _jsx(AppContext.Provider, { value: value, children: children });
};
export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
