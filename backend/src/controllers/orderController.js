// backend/src/controllers/orderController.js
import { Order } from '../models/Order.js';

export const orderController = {
    // Get all orders
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
                .sort({ createdAt: -1 });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create new order
    createOrder: async (req, res) => {
        try {
            const order = new Order(req.body);
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update order status
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get order by ID
    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update order items
    updateOrderItems: async (req, res) => {
        try {
            const { id } = req.params;
            const { items } = req.body;
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            order.items = items;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};