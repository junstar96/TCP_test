import { CLIENT_VERSION } from "../constant.js";
import { getGameAssets } from "../init/asset.js";
import stageModel from "../models/stage.models.js";
import { getUser, removeUser } from "../models/user.models.js"
import { handlerMappings } from "./handlerMappings.js";

export const handleDisconnect = (socket,uuid)=>{
    removeUser(socket.id);
    console.log(socket.id,getUser());
    socket.emit('disconnection', {status : "success"});
}


//스테이지에 따라서 더 높은 점수 획득
//시작할 때 테이블을 등록하기
export const handleConnection = (socket,uuid) =>{
    console.log(`connected : ${uuid}`);
    console.log(`current user : `, getUser());

    const {stages} = getGameAssets();
    //stage 배열에서 0번째 = 첫 번째 스테이지
    // console.log(stages);
    stageModel.createStage(uuid);
    //stageModel.setStage(uuid, stages.data[0].id);
    // console.log('stage : ', stageModel.getStage(uuid));
    socket.emit('connection', {uuid});

}

export const handleEvent = (io, socket, data) => {
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

    //이벤트들을 여러 개 등록한 것 가운데 하나를 받아 온다.
    const handler = handlerMappings[data.handlerId];
    if(!handler)
    {
        socket.emit("response", {status : 'handle mismatch'});
        return;
    }

    //실행된 결과를 반환한다.
    const response = handler(data.userId, data.payload);
    if(response.broadcast)
    {
        io.emit('response', 'broadcast');
        return;
    }

    console.log(response);

    socket.emit('event', response)

    return response; 
}
