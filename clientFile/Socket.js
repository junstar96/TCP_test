import { CLIENT_VERSION } from './Constants.js';
import { handlerMappings } from './handler/clientMapping.js'
import {score} from './index.js'

//도메인을 안 하면 ES2의 public id를 적으면 된다.
const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log("responce");
  console.log(data);
  if(typeof data.id !== 'undefined')
  {
    console.log("리스폰 확인")
    const responseHandler = handlerMappings[data.id];
    const response = responseHandler(data.payload);
  }

});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  console.log("시작시에 전송됨")
  
  userId = data.uuid;
});

socket.on('disconnection', (data) =>{
  if(data.status !== 'success')
  {
    console.log("아이디 지워짐")
  }
})

//받을 필요가 있는가 확인해야 하나.
socket.on('event', (data) => {

  if(data.status==='success')
  {
    console.log(data);
    //data에 아이디를 보내고 그걸로 맵핑한다.
    const handler = handlerMappings[data.id];

    if(!handler)
    {
      console.log("핸들 없음");
      return;   
    }

    if(data.payload)
    {
      const response = handler(data.payload);
    }
    else
    {
      console.log("payload 없음", data.id);
    }
    

    return data; 
  }
  else
  {
    
    console.log("이벤트 연결 실패");
  }
  //const handler = handlerMappings[data]
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
