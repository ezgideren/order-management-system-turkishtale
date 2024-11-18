import { Table } from '../models/Table.js';

export const tableController = {
    // Get all tables
    getAllTables: async (req, res) => {
        try {
            const tables = await Table.find()
                .sort({ number: 1 })
                .populate('currentOrder');
            res.json(tables);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create new table
    createTable: async (req, res) => {
        try {
            const newTable = new Table(req.body);
            await newTable.save();

            // Emit socket event for real-time update
            req.app.get('io').emit('tableUpdated', { action: 'create', table: newTable });

            res.status(201).json(newTable);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update table status
    updateTableStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const updatedTable = await Table.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            ).populate('currentOrder');

            if (!updatedTable) {
                return res.status(404).json({ message: 'Table not found' });
            }

            // Emit socket event for real-time update
            req.app.get('io').emit('tableUpdated', { action: 'update', table: updatedTable });

            res.json(updatedTable);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get table details with current order
    getTableDetails: async (req, res) => {
        try {
            const table = await Table.findById(req.params.id)
                .populate({
                    path: 'currentOrder',
                    populate: {
                        path: 'items.menuItem'
                    }
                });

            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            res.json(table);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};