import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/asset.js';
import { fileURLToPath } from 'url';
import path from 'path';

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


server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  //서버가 실행된 다음에 파일을 읽는다.
  try
  {
    const assets = await loadGameAssets();
  }
  catch(err)
  {
    console.error(err);
  }
});