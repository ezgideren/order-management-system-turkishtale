import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import authRoutes from './src/routes/authRoutes.js';
import menuRoutes from './src/routes/menuRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import tableRoutes from './src/routes/tableRoutes.js';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

dotenv.config({ path: join(rootDir, '.env') });

const app = express();
const httpServer = createServer(app);

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://order-management-system-turkishtale-uudf.onrender.com']
        : ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', 1); // Trust Render's proxy

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/tables', tableRoutes);

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 10000;

        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
            console.log('CORS origin:', corsOptions.origin);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();