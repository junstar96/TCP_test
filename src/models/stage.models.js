const stages = {};

export const createStage = (uuid) => {
    stages[uuid] = {};
}

export const getStage = (uuid) => {
    return stages[uuid];
}

export const setStage = (uuid, id, timestamp) => {
    //여기에서 스테이지를 변경시키는 작업을 해야 한다.
    return stages[uuid].push({id, timestamp});
}