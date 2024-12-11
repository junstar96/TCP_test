const users = [];

//유저를 추가하면서 점수는 0점으로 잡도록 하자.
//스코어도 유저에서 관리하도록 하는 게 맞을까?
export const addUser = (user) =>{
    users.push(user);
}

export const removeUser = (socketid) =>{
    const index = users.findIndex((user)=> user.socketID === socketid);
    if(index !== -1)
    {
        return users.splice(index, 1)[0];
    }
}

export const getUser = () => {
    return users;
}