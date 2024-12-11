import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

socket.on('disconnection', (data) =>{
  if(data.status !== 'success')
  {
    console.log("아이디 지워짐")
  }
})

socket.on('event', (data) => {
  console.log(data);
})

//확인 중
const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
