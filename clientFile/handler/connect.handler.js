import {score} from '../index.js'
import Player from '../Player.js';

export const Starting = (payload)=>{
    if(payload.status === "success")
    {
        console.log("연결 확인")
        score.HIGHSCORE = payload.score;
        score.nextStageLimit = payload.nextStage.score;
        score.currentStage = payload.currentStage.id;
        score.nextStage = payload.nextStage.id;
        score.scoreRate = payload.currentStage.scorePerSecond;
        console.log(score.scoreRate);
        console.log(score.HIGHSCORE);
    }
    else
    {
        score.HIGHSCORE = score.HIGHSCORE > 100 ? score.HIGHSCORE : 100;
    }
}

export const Ending = (payload) => {
    console.log(payload.message);
}

export const CheckBroad = (payload)=>{
    console.log("브로드 성공")
}