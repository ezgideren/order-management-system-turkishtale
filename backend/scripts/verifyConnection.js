// backend/scripts/verifyConnection.js
import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/turkish-tale';

const verifyConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB!');

        // Get list of collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\nAvailable collections:', collections.map(c => c.name));

        // If users collection exists, count documents
        if (collections.some(c => c.name === 'users')) {
            const userCount = await mongoose.connection.db.collection('users').countDocuments();
            console.log(`Number of users in database: ${userCount}`);
        } else {
            console.log('No users collection found');
        }

    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed');
        process.exit();
    }
};

verifyConnection();