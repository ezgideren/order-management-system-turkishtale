// backend/config/database.js
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..', '..');

dotenv.config({ path: join(rootDir, '.env') });


const connectDB = async () => {
    try {
        // Log for debugging
        console.log('Loading environment variables...');
        console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Not defined');
        console.log('Current directory:', __dirname);
        console.log('Root directory:', rootDir);

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB successfully');

        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;