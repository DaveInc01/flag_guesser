import { io, Socket } from 'socket.io-client';
import { useEffect, useRef } from "react";
import { useAppDispatch } from './hooks';
import { socket } from "./socket";

const socketInstance = socket();

export const useSocketListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('wait', (data: any) => {
        
      });
  
      socketInstance.on('play', (data: any) => {
        console.log('Play event received:', data);
        // Handle the play event data here
      });
  
      socketInstance.on('leave', (data: any) => {
  
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        ['wait', 'play', 'leave'].forEach(event => {
          socketInstance?.off(event);
        });
      }
    };
  }, []);
}