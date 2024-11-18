// backend/src/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    notes: String,
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'delivered'],
        default: 'pending'
    },
    preparedKitchen: {
        type: Boolean,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['new', 'in-progress', 'ready', 'completed'],
        default: 'new'
    },
    server: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);