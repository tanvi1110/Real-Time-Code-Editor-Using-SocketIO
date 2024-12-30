import {io} from 'socket.io-client'
// import dotenv from 'dotenv';
// dotenv.config();
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const initSocket = async () => {
    const options = {
        'force new connection' : true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    }
//    console.log(`this is the error ${process.env.REACT_APP_BACKEND_URL}`)
   return io(backendUrl, options);
}