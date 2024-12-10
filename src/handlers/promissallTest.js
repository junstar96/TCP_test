const promiseTest1 = new Promise((res,rej)=>{
    res("사용 성공");
})

const promiseTest2 = new Promise((res,rej)=>{
    res("사용 성공");
})

//예외 처리를 할 때는 catch를 쓰자.
//예외 처리가 있는 시점에서 try의 기능도 포함되어 있는 것이다.
const test3 = new Promise((res, rej)=>{
    rej("사용 실패");
}).catch((e)=>{
    return e;
}
)

let obtest = {};

const check1 = 10;
const check2 = 20;

const hello = await Promise.all([
    promiseTest1,
    promiseTest2
])



const check = await test3;

obtest[check1] = {check2, check};

console.log(obtest);

