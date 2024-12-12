import { getGameAssets } from "../init/asset.js";
import stageModel from "../models/stage.models.js";

//서버에서 아이템 생성도 고려해 봐야 할까?

export const moveStageHandler = (uuid, payload) => {
    //유저는 스테이지를 하나씩 올라갈 수 있다.
    //유저는 일정 점수가 되면 다음 스테이지로 이동한다. 점수에 따라 스테이지가 결정된다.

    //currentStage, targetStage
    //위의 두 정보를 payload에 담아 보낸다.

    
    let currentstages = stageModel.getStage(uuid);
    if(!currentstages.length)
    {
        return {status :'fail', message :"no stages"};
    }

    //오름차순 -> 가자 큰 스테이지 id를 확인

    currentstages.sort((a,b) => a.id - b.id);
    //const currentstageId = currentstages[currentstages.length - 1].id;

    //클라이언트 vs 서버 비교
    if(currentstages.id !== payload.currentstage)
    {
        return {status :'fail', message :"no found"};
    }

    
    const index_stage = stages.data.find((element)=>element.id === payload.targetStage);
    //최대 스테이지까지 갔다면 다른 명령어를 보내도록 하자.
    if(!index_stage)
    {
        
    }  

    const index_itemunlock = itemUnlocks.data.find((element) => element.stage_id === payload.targetStage);


    const serverTime = Date.now();
    const elapsedTime = (serverTime - currentstages.timestamp) / 1000;

    //1스테이지에서 2스테이지로 넘어가는 과정
    //임의로 정한 오차 범위
    if(elapsedTime < 10 || elapsedTime >11)
    {
        return {status : 'fail', message : "invalid elapsed time"}
    }


    // targetStage 대한 검증 <- 게임 에셋이 존재하는가.
    const {stages, itemUnlocks} = getGameAssets();

    
    //some : 하나라도 맞으면 참이다.
    if(!stages.data.some((stage) => stage.id === payload.targetStage))
    {
        return {status :'fail', message :"stage nothing"};
    }

    

    


    //플레이어의 점수에 따라서 스테이지를 이동시킨다.

    //각 스테이지마다 점수가 다르니 저장해 줘야 한다.
    stageModel.setStage(uuid, payload.targetStage, serverTime);

    //스테이지 변경 정보를 보내도록 하자.
    console.log(payload.targetStage);
    return {status : "success",id : 1,  payload : {stage : payload.targetStage,nextStage : index_stage, scoreRate : index_stage.scorePerSecond, itemTable : index_itemunlock.item_id}};
}