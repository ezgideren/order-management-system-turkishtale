// backend/routes/healthCheck.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', async (req, res) => {
    try {
        const status = {
            server: 'healthy',
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            timestamp: new Date()
        };
        res.json(status);
    } catch (error) {
        res.status(500).json({
            server: 'unhealthy',
            database: 'error',
            error: error.message
        });
    }
});

export default router;