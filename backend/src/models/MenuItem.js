import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['hot', 'cold'],
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number,
        required: true,
        min: 0
    },
    modificationOptions: [String]
}, {
    timestamps: true
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);