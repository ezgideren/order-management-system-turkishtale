import { Socket } from 'socket.io-client';
declare class SocketService {
    private socket;
    private connected;
    connect(): Socket;
    joinAppropriateRooms(): void;
    disconnect(): void;
    isConnected(): boolean;
    getSocket(): Socket | null;
}
declare const _default: SocketService;
export default _default;
