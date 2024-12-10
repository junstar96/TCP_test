import { Server as SocketIO } from 'socket.io';

const initSocket = (server) => {
  const io = new SocketIO();
  io.attach(server);

  

  io.on('connection', (socket)=>{})
};

export default initSocket;