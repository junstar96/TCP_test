const users = [];

//유저를 추가하면서 점수는 0점으로 잡도록 하자.
//스코어도 유저에서 관리하도록 하는 게 맞을까?
export const addUser = (user) =>{
    //console.log("유저 투입 확인 ", user);
    const index = users.findIndex((data)=>data.uuid === user.uuid);
    if(index === -1)
    {
        users.push(user);
    }
    
}

//유저가 삭제되면 해당 유저의 결과 값도 변경되도록 한다.
export const removeUser = (socketid) =>{
    const index = users.findIndex((user)=> user.socketID === socketid);
    if(index !== -1)
    {
        users.splice(index, 1);
    }

    const scoreIndex = userScore.findIndex((data)=>data.id === socketid);
    if(scoreIndex !== -1)
    {
        userScore.splice(scoreIndex, 1);
    }
}

export const updateUser = (uuid, score) => {
    const index = users.findIndex((data)=>data.uuid === uuid);

    if(index !== -1)
    {
        if(users[index].score < score)
        {
            users[index].scroe = score;
            return true;
        }
    }

    return false;
}

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
    const rankone = users.reduce((prev, value) => {
        return prev.score > value.score ? prev : value
    })

    return rankone;

}

export const getUser = () => {
    return users;
}