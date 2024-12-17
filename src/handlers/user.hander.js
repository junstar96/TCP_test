import { addUser, getUser, updateUser } from "../models/user.models.js"

//유저 정보를 갱신할 수 있으면 갱신한다.
export const highRankRecord = (uuid, payload) => {
    let check = updateUser(uuid, payload.score);
    console.log("유저 점수 갱신");

    return {id : 999,message : "success", payload : {message : "check"}};
}