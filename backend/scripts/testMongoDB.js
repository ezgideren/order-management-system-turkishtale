// backend/scripts/testMongoDB.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const mongoURI = 'mongodb://localhost:27017/turkish-tale';

// Define the schema directly in the test script
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'server', 'kitchen'] },
    isActive: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

const createUsers = async () => {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing users
        console.log('Clearing existing users...');
        await User.deleteMany({});
        console.log('Existing users cleared');

        // Create hash of passwords
        const halePassword = await bcrypt.hash('hale123', 10);
        const servisPassword = await bcrypt.hash('password123', 10);
        const kitchenPassword = await bcrypt.hash('kitchen123', 10);

        // Create users
        const users = [
            {
                username: 'hale',
                password: halePassword,
                role: 'admin'
            },
            {
                username: 'servis',
                password: servisPassword,
                role: 'server'
            },
            {
                username: 'kitchen',
                password: kitchenPassword,
                role: 'kitchen'
            }
        ];

        // Insert users one by one
        for (const userData of users) {
            console.log(`Creating user: ${userData.username}`);
            const user = new User(userData);
            await user.save();
            console.log(`User ${userData.username} created successfully`);
        }

        // Verify users were created
        const allUsers = await User.find({}, '-password');
        console.log('\nCreated users:', JSON.stringify(allUsers, null, 2));

        console.log('\nTest users created successfully!');
        console.log('\nCredentials:');
        console.log('Admin - hale:hale123');
        console.log('Server - servis:password123');
        console.log('Kitchen - kitchen:kitchen123');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
        process.exit();
    }
};

// Run the script
createUsers();