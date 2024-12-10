import { getGameAssets } from "../init/asset.js";
import { getStage, setStage } from "../models/stage.models.js";

export const moveStageHandler = (uuid, payload) => {
    //유저는 스테이지를 하나씩 올라갈 수 있다.
    //유저는 일정 점수가 되면 다음 스테이지로 이동한다. 점수에 따라 스테이지가 결정된다.

    //currentStage, targetStage
    //위의 두 정보를 payload에 담아 보낸다.

    let currentstages = getStage(uuid);
    if(!currentstages.length)
    {
        return {status :'fail', message :"no stages"};
    }

    //오름차순 -> 가자 큰 스테이지 id를 확인

    currentstages.sort((a,b) => a.id - b.id);
    const currentstageId = currentstages[currentstages.length - 1].id;

    //클라이언트 vs 서버 비교
    if(currentstageId !== payload.currentstage)
    {
        return {status :'fail', message :"no found"};
    }

    // targetStage 대한 검증 <- 게임 에셋이 존재하는가.
    const {stages} = getGameAssets();
    //some : 하나라도 맞으면 참이다.
    if(!stages['stages'].data.some((stage) => stage.id === payload.targetStage))
    {
        return {status :'fail', message :"stage nothing"};
    }

    //플레이어의 점수에 따라서 스테이지를 이동시킨다.

    setStage(uuid, payload.targetStage);

    return {status : "success"};
}