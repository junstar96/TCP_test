const users = [];

//유저를 추가하면서 점수는 0점으로 잡도록 하자.
//스코어도 유저에서 관리하도록 하는 게 맞을까?
export const addUser = (user) =>{
    //console.log("유저 투입 확인 ", user);
    const index = users.findIndex((data)=>data.socketID === user.socketID);
    if(index === -1)
    {
        users.push({socketID : user.socketID , id : user.id, score : 0});
    }
    console.log(users);
}

//유저가 삭제되면 해당 유저의 결과 값도 변경되도록 한다.
export const removeUser = (uuid) =>{
    const index = users.findIndex((user)=> user.id === uuid);
    if(index !== -1)
    {
        users.splice(index, 1);
    }

    // const scoreIndex = userScore.findIndex((data)=>data.id === uuid);
    // if(scoreIndex !== -1)
    // {
    //     userScore.splice(scoreIndex, 1);
    // }
}

export const updateUser = (uuid, score) => {
    try
    {
        const index = users.findIndex((data)=>data.id === uuid);

    if(index !== -1)
    {
        if(users[index].score < score)
        {
            users[index].score = score;
            return true;
        }

        console.log(users);
    }
    }
    catch(err)
    {
        console.error("유저 정보 업데이트 중 에러");
        console.warn(`error : ${err}`);
    }
    finally
    {

    }
    

    

    return false;
}

// export const updateUserFromClient = (uuid, payload) => {
//     const index = users.findIndex((data)=>data.uuid === uuid);

//     if(index !== -1)
//     {
//         if(users[index].score < payload.score)
//         {
//             users[index].score = payload.score;
//         }
//     }
// }

//점수 기준으로 정렬을 한 뒤 제일 맨 위의 값이 1등이니까
export const RankOneCheck = (uuid, score) => {
    const rankone = users.reduce((prev, value) => {
        return prev.score > value.score ? prev : value
    });
    if(rankone.uuid === uuid)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export const RankOneScore = () => {
    if(!users)
    {
        return 0;
    }
    else
    {
        const rankone = users.reduce((prev, value) => {
            return prev.score > value.score ? prev : value
        })
    
        return rankone.score;
    }

    

}

export const RecordScore = (uuid,score) => {
    try
    {
        const index = users.findIndex((data)=>data.id === uuid)
        {

        }
    }
    catch(err)
    {
        console.error("랭킹 업데이트 중 발생",err);
    }
}

export const getUser = () => {
    return users;
}