import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

import { User, USER_ROLES } from '../src/models/User.js';

const initialUsers = [
    {
        username: 'hale',
        password: 'hale123',
        role: USER_ROLES.ADMIN
    },
    {
        username: 'servis',
        password: 'password123',
        role: USER_ROLES.SERVER
    },
    {
        username: 'kitchen',
        password: 'kitchen123',
        role: USER_ROLES.KITCHEN
    }
];

const setupUsers = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        console.log('Connecting to MongoDB:', mongoURI);

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');


        await User.deleteMany({});
        console.log('Cleared existing users');


        for (const userData of initialUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`Created user: ${userData.username} with role: ${userData.role}`);
            console.log('Permissions:', user.permissions);
        }

        console.log('\nInitial users created successfully:');
        console.log('----------------------------------------');
        console.log('Admin (Full Access):');
        console.log('Username: hale');
        console.log('Password: hale123');
        console.log('----------------------------------------');
        console.log('Server (Orders & Tables):');
        console.log('Username: servis');
        console.log('Password: password123');
        console.log('----------------------------------------');
        console.log('Kitchen (Kitchen Display):');
        console.log('Username: kitchen');
        console.log('Password: kitchen123');
        console.log('----------------------------------------');

    } catch (error) {
        console.error('Error setting up users:', error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

setupUsers();