import {score, itemController} from "../index.js"


//아이템의 테이블을 받고 그 테이블로 itemController를 변경한다.

//스테이지를 변경한다.
//스테이지를 변경하면서 아이템 테이블도 변경하자.
export const StageChange = (payload) => {
    //payload를 통해 데이터를 받았으니 그 안에서 
    console.log("시작 전", score.currentStage);
    score.currentStage = payload.stage;
    score.nextStage = payload.nextStage;
    score.scoreRate = payload.scoreRate;
    console.log(score.scoreRate);
    console.log(score.currentStage, ":", score.nextStage);
    score.stageChange = true;
    //아이템의 테이블을 또 변경해 보도록 하자.
    itemController.currentItemList = payload.itemTable;

    console.log("시작 후", score.currentStage);
    console.log(payload.itemTable);
}

//전체 랭킹 가운데 최고 값을 받아오도록 하자.
export const GetWorldRank = (payload) => {
    score.HIGHSCORE = payload.score > score.HIGHSCORE ? payload.score : score.HIGHSCORE;
}