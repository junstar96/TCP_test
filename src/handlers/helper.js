import { CLIENT_VERSION } from "../constant.js";
import { getGameAssets } from "../init/asset.js";
import { getStage, setStage } from "../models/stage.models.js";
import { getUser, removeUser } from "../models/user.models.js"
import { handlerMappings } from "./handlerMappings.js";

export const handleDisconnect = (socket,uuid)=>{
    removeUser(socket.id);
    console.log(socket.id,getUser());
}

export const handleEvent = (io, socket, data) => {

}



//스테이지에 따라서 더 높은 점수 획득
export const handleConnection = (socket,uuid) =>{
    console.log(`connected : ${uuid}`);
    console.log(`current user : `, getUser());

    const {stage} = getGameAssets();
    //stage 배열에서 0번째 = 첫 번째 스테이지
    setStage(uuid, stage.data[0].id);
    console.log('stage : ', getStage(uuid));
    socket.emit('connection', {uuid});

}

export const handlerEvent = (io, socket, data) => {
    if(!data.clientVersion)
    {
        console.log("버전 없음");
        socket.emit("response", {status : 'version fail'});
        return;
    }
    if(!CLIENT_VERSION.includes(data.clientVersion))
    {
        socket.emit("response", {status : 'version mismatch'});
        return;
    }

    const handler = handlerMappings[data.handlerId];
    if(!handler)
    {
        socket.emit("response", {status : 'handle mismatch'});
        return;
    }

    const response = handler(data.userId, data.payload);
    if(response.broadcast)
    {
        io.emit('response', 'broadcast');
        return;
    }

    return handler(data.userId, data.payload);
}
