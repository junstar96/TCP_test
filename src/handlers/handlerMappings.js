import { gameEnd, gameStart } from "./gamestart.handler.js";
import { moveStageHandler } from "./stage.handler.js";

//아이디 값을 받고 그것에 맞는 함수를 불러오는 방식으로
export const handlerMappings = {
    2 : gameStart,
    3 : gameEnd,
    11 : moveStageHandler,
    
}