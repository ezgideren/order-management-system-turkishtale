import express from 'express';
import cors from 'cors';
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

//Initialize Express
const app = express();

const corsOptions = {
    origin: 'https://order-management-system-turkishtale-uudf.onrender.com',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

//Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

//Test route for CORS
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS is working' });
});

//Routes
app.use('/api/login', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

//Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        path: req.path
    });
});

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 10000;

        app.listen(PORT, () => {
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