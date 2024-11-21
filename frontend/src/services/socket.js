// src/services/socket.ts
import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
class SocketService {
    constructor() {
        Object.defineProperty(this, "socket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "connected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                auth: {
                    token: localStorage.getItem('token')
                }
            });
            this.socket.on('connect', () => {
                this.connected = true;
                console.log('Socket connected');
            });
            this.socket.on('disconnect', () => {
                this.connected = false;
                console.log('Socket disconnected');
            });
            this.socket.on('reconnect', () => {
                console.log('Socket reconnected');
                this.joinAppropriateRooms();
            });
        }
        return this.socket;
    }
    joinAppropriateRooms() {
        if (!this.socket)
            return;
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'kitchen_staff') {
            this.socket.emit('joinKitchen');
        }
        if (userRole?.includes('server')) {
            this.socket.emit('joinServers');
        }
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
        }
    }
    isConnected() {
        return this.connected;
    }
    getSocket() {
        return this.socket;
    }
}
export default new SocketService();
