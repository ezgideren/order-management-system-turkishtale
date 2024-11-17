// backend/controllers/menuController.js
import { MenuItem } from '../models/MenuItem.js';

export const menuController = {
    // Get all menu items
    getAllItems: async (req, res) => {
        try {
            const items = await MenuItem.find()
                .sort({ category: 1, name: 1 });
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get single menu item
    getItemById: async (req, res) => {
        try {
            const item = await MenuItem.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.json(item);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create menu item
    createItem: async (req, res) => {
        try {
            const menuItem = new MenuItem(req.body);
            const newItem = await menuItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update menu item
    updateItem: async (req, res) => {
        try {
            const updatedItem = await MenuItem.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            res.json(updatedItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete menu item
    deleteItem: async (req, res) => {
        try {
            const item = await MenuItem.findByIdAndDelete(req.params.id);

            if (!item) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            res.json({ message: 'Menu item deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Toggle item availability
    toggleAvailability: async (req, res) => {
        try {
            const item = await MenuItem.findById(req.params.id);

            if (!item) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            item.available = !item.available;
            await item.save();

            res.json(item);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};