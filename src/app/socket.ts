import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const socket = () => {
  const token = localStorage.getItem('username');
  if (!token) return null;
  
  if (!socketInstance) {
    socketInstance = io('http://localhost:8889', {
      auth: { token },
      transports: ['websocket'],
    });
    console.log(socketInstance, 'Connecting to socket server...');
    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance?.id);  
    });
    // Handle connection error
    socketInstance.on('connect_error', (error: any) => {
      console.error('Connection error:', error);
      // You can also add additional logic, like retry mechanisms or alerts
    });
  }
  

  return socketInstance;
};

export const reconnectSocket = () => {
  socketInstance = null;
  socket();
}