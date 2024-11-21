// src/services/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://turkishtale-ordermanagement.onrender.com';

class SocketService {
    private socket: Socket | null = null;
    private connected: boolean = false;

    connect(): Socket {
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

    joinAppropriateRooms(): void {
        if (!this.socket) return;

        const userRole = localStorage.getItem('userRole');
        if (userRole === 'kitchen_staff') {
            this.socket.emit('joinKitchen');
        }
        if (userRole?.includes('server')) {
            this.socket.emit('joinServers');
        }
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    getSocket(): Socket | null {
        return this.socket;
    }
}

export default new SocketService();