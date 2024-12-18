//redis를 테스트하기 위한 파일
import redis from 'redis'
import dotenv from 'dotenv'
import express from 'express'
import { json } from 'stream/consumers';

dotenv.config();

const redisClient = redis.createClient({
    url: `redis://default:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORTNUMBER}/0`,
    legacyMode: true // 반드시 설정?
});

redisClient.on('connect', ()=> {
    console.info('Redis Connected');
})

redisClient.on('error', (err) => {
    console.error('redis error', err);
})

//CRUD


redisClient.connect().then();//redis v4 비동기 연결
const redisCli = redisClient.v4;//v4는 프로미스 기반이다.

//set을 사용해서 create, update가 가능하다.
// await redisCli.set('stage', JSON.stringify({
//     "name": "stage",
//     "version": "1.0.0",
//     "data": [
//       { "id":  1000, "score": 0, "scorePerSecond" : 10},
//       { "id":  1001, "score": 40, "scorePerSecond" : 10 },
//       { "id":  1002, "score": 80, "scorePerSecond" : 4 },
//       { "id":  1003, "score": 300, "scorePerSecond" : 8 },
//       { "id":  1004, "score": 400, "scorePerSecond" : 16 },
//       { "id":  1005, "score": 500, "scorePerSecond" : 32 },
//       { "id":  1006, "score": 600, "scorePerSecond" : 64 }
//     ]
//   }));

// await redisCli.set('item', JSON.stringify({
//     "name": "item",
//     "version": "1.0.0",
//     "data": [
//       { "id":  1, "score": 10 },
//       { "id":  2, "score": 20 },
//       { "id":  3, "score": 30 },
//       { "id":  4, "score": 40 },
//       { "id":  5, "score": 50 },
//       { "id":  6, "score": 60 }
//     ]
//   }))

// await redisCli.set('item_unlock', JSON.stringify({
//     "name": "item_unlock",
//     "version": "1.0.0",
//     "data": [
//       { "id":  101, "stage_id": 1001, "item_id": [1,2] },
//       { "id":  201, "stage_id": 1002, "item_id": [1,2] },
//       { "id":  301, "stage_id": 1003, "item_id": [2,3] },
//       { "id":  401, "stage_id": 1004, "item_id": [1,2,3,4] },
//       { "id":  501, "stage_id": 1005, "item_id": [3,4,5,6] },
//       { "id":  601, "stage_id": 1006, "item_id": [5,6] }
//     ]
//   }))
//get을 통해서 read가 가능하다.
//let data = await redisCli.get('stage');
//data = JSON.parse(data);
//del을 통해 delete 가능
// await redisCli.del('test1');
// await redisCli.del('item_unlock');
//console.log(data);

export const SetValueFromRedis = async (key) => {
    let value = await redis.get(key);
    value = json.parse(value);

    return value;
}


// //밑에는 나중에 express를 이용해 연결할 때 필요할 듯



// // GET

// const router = express.Router();
// router.get('/', async (req, res, next) => {
//    await redisCli.get('username');
// });

// // POST
// router.post('/set', async (req, res, next) => {
//    await redisCli.set('username', 'inpa');
// });

// // DELETE
// router.delete('/del', async (req, res, next) => {
//    // exist : 키가 존재하는지
//    const n = await redisCli.exists('username'); // true: 1 , false: 0
//    if(n) await redisCli.del('username');
// });

// // PUT
// router.put('/rename', async (req, res, next) => {
//    // username이라는 키값이 있다면 그 값을 helloname으로 바꿈
//    redisCli.rename('username', 'helloname');
// });