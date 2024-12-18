import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import stageModel from '../models/stage.models.js';
import './redisConnect.js'
import { SetValueFromRedis } from './redisConnect.js';

let gameAssets = {};



//비동기 식, 병렬 작업은 동시에 처리한다는 의미.

//현재 파일의 절대 경로. asset.js의 절대 경로
const __filename = fileURLToPath(import.meta.url);
//현재 파일 빼고 폴더 이름을 찾아냄.
const __dirname = path.dirname(__filename);
// 찾을 파일
// 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../../assets');

//파일 읽는 함수
const readFileAsync = (filename) => {
    return new Promise((res, rej) => {
        fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
            if (err) {
                rej(err);
                return;
            }

            res(JSON.parse(data));
        })
    })
}

//다운 받아 놓은 json 파일 내에서 데이터 꺼내 오기.
export const loadGameAssets = async () => {
    try {
        const [stages, items, itemUnlocks] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('item.json'),
            readFileAsync('item_unlock.json')
        ]);

        gameAssets = { stages, items, itemUnlocks };
        // console.log(stages);
        // stageModel.inputStage(stages);
        // console.log(stagemodel.AllStage());
        
        
        return gameAssets;
    }
    catch (err) {
        throw new Error(`fail ${err}`);
    }



}

//redis를 이용하여 불러오도록 연습하기
export const loadGameAssetsFromRedis = async () => {
    try {
        const [stages, items, itemUnlocks] = await Promise.all([
            SetValueFromRedis('stage'),
            SetValueFromRedis('item'),
            SetValueFromRedis('item_unlock')
        ]);

        gameAssets = { stages, items, itemUnlocks };
        // console.log(stages);
        // stageModel.inputStage(stages);
        // console.log(stagemodel.AllStage());
        
        
        return gameAssets;
    }
    catch (err) {
        throw new Error(`fail ${err}`);
    }



}

export const getGameAssets = () => {
    return gameAssets;
}

