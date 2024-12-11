const stages = {};

const createStage = (uuid) => {
    stages[uuid] = [];
}

const inputStage = (payload) => {
    stages = payload;
}

const getStage = (uuid) => {
    return stages[uuid];
}

const AllStage = ()=>{
    return stages;
}

const setStage = (uuid, id, timestamp) => {
    //여기에서 스테이지를 변경시키는 작업을 해야 한다.
    // if(Object.values(stages).includes(uuid))
    // {
    //     createStage(uuid);
    // }


    stages[uuid].push({id, timestamp});
    return stages[uuid];
}

const clearStage = (uuid) => {
    stages[uuid] = [];
}

export default {createStage, inputStage, getStage,AllStage,setStage, clearStage};