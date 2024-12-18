import redis from 'redis'
import dotenv from 'dotenv'
import express from 'express'
import { json } from 'stream/consumers';

dotenv.config();

export let redisClient = null;
export let redisCli = null;

export const ConnectToRedis = async () =>{
    redisClient = redis.createClient({
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
    redisCli = redisClient.v4;
    console.log("REDIS연결 확인")
}


export const SetValueFromRedis = async (key) => {
    console.log("redis입력 확인")
    let value = await redisCli.get(key);
    value = JSON.parse(value);

    return value;
}