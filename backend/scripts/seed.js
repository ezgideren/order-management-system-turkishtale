// backend/scripts/seed.js
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../src/models/User.js';
import { MenuItem } from '../src/models/MenuItem.js';
import bcrypt from 'bcryptjs';

config();

const users = [
    {
        username: 'hale',
        password: 'hale123',
        role: 'admin'
    },
    {
        username: 'servis',
        password: 'password123',
        role: 'server'
    },
    {
        username: 'kitchen',
        password: 'kitchen123',
        role: 'kitchen'
    }
];

const menuItems = [
    {
        name: 'Turkish Coffee',
        price: 5.99,
        category: 'Beverages',
        type: 'hot',
        available: true,
        preparedKitchen: false,
        modificationOptions: ['Extra sugar', 'Medium sugar', 'No sugar']
    },
    {
        name: 'Baklava',
        price: 7.99,
        category: 'Desserts',
        type: 'cold',
        available: true,
        preparedKitchen: false,
        modificationOptions: ['With pistachios', 'With walnuts']
    },
    {
        name: 'Kebab',
        price: 15.99,
        category: 'Main Dishes',
        type: 'hot',
        available: true,
        preparedKitchen: true,
        modificationOptions: ['Spicy', 'Extra meat', 'With rice']
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        // Clear existing data
        await User.deleteMany({});
        await MenuItem.deleteMany({});
        console.log('Cleared existing data');

        // Create users with hashed passwords
        const hashedUsers = await Promise.all(users.map(async user => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        })));

        await User.insertMany(hashedUsers);
        console.log('Users seeded successfully');

        // Create menu items
        await MenuItem.insertMany(menuItems);
        console.log('Menu items seeded successfully');

        console.log('Database seeded! 🌱');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();