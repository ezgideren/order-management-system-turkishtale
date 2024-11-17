import { Server } from 'socket.io';

export const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    // Socket event handlers
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Join room based on role
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined ${room}`);
        });

        // Role-specific rooms
        socket.on('joinKitchen', () => socket.join('kitchen'));
        socket.on('joinServers', () => socket.join('servers'));

        // Handle order updates
        socket.on('orderStatusUpdate', (data) => {
            io.to('kitchen').to('servers').emit('orderUpdated', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};