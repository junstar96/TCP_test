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
initSocket(server); // 소켓 추가

app.get('/', (req, res) => {
  // try
  // {
  //   res.sendFile(__dirname, "public", "index.html");
  // }
  // catch(err)
  // {
  //   return res.status(404).json({error : "뭔가 문제"});
  // }
  
  res.send('<h1>Hello World</h1>');
});



server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  //서버가 실행된 다음에 파일을 읽는다.
  try
  {
    //게임에 필요한 데이터 에셋을 받아오는 상황
    const assets = await loadGameAssets();
    //console.log(assets['stages'].data);
  }
  catch(err)
  {
    console.error(err);
  }
});