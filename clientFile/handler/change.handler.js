import {score, itemController} from "../index.js"


//아이템의 테이블을 받고 그 테이블로 itemController를 변경한다.
export const ChangeItemTable = (data) => {

}

//스테이지를 변경한다.
export const StageChange = (payload) => {
    //payload를 통해 데이터를 받았으니 그 안에서 
    console.log("시작 전", score.currentStage);
    score.currentStage = payload.stage;
    score.nextStage = payload.nextStage;
    score.scoreRate - payload.scoreRate;
    //아이템의 테이블을 또 변경해 보도록 하자.
    itemController.currentItemList = itemTable;

    console.log("시작 후", score.currentStage);
    console.log(payload.itemTable);
}