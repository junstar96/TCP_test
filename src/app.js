import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets, loadGameAssetsFromRedis } from './init/asset.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { ConnectToRedis } from './init/redisConnect.js';


const app = express();
const server = createServer(app);

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//정적 서빙
app.use(express.static('clientFile'));
initSocket(server); // 소켓 추가
await ConnectToRedis(); //redis 서버와 연결

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  //서버가 실행된 다음에 파일을 읽는다.
  try
  {
    //이 코드는 기존의 json 파일에서 읽어 오는 방식
    //const assets = await loadGameAssets();
    //밑의 코드는 redis에서 읽어 오는 방식
    const assets = await loadGameAssetsFromRedis();
  }
  catch(err)
  {
    console.error(err);
  }
});