import { getGameAssets } from "../init/asset.js"
import stageModels from "../models/stage.models.js";
import stageModel from "../models/stage.models.js"

//게임 정보가 릿세이 될 때마다 여기가 호출된다.
export const gameStart = (uuid, payload) => {
    const {stages} = getGameAssets();
    stageModel.createStage(uuid);
    stageModel.setStage(uuid, stages.data[0].id, payload.timestamp);
    console.log("게임 시작 확인", stageModel.getStage(uuid));
    return {status : 'success'}
}

export const gameEnd = (uuid, payload) => {
    // 클라이언트는 게임 종료 시 타임스탬프와 총 점수 전송
    const {timestamp:gameendtime, score } = payload;
    const stages = stageModel.getStage(uuid);
    //total score
    let totalScore = 0;

    if(!stages.length)
    {
        return {status : "fail", message : 'no stages'};
    }

    stages.forEach((stage, index) => {
        let stageEndTime;
        if(index === stages.length - 1)
        {
            stageEndTime = 0;
        }
        else
        {
            stageEndTime = stages[index + 1].timestamp;
        }
        
        const stageDuration = (stageEndTime - stage.timestamp) / 1000;

    });

    console.log(stageModels.getStage());

    //점수와 타임스탬프 검증
    //오차범위를 확인
    if(Math.abs(score - totalScore) > 5)
    {
        return {status : "fail", message : "score fail"};
    }
    return {status : 'success', payload : {message : "nothing"}};
}

//아이템을 받아오는 물건
export const getItem = (data) => {
    
}