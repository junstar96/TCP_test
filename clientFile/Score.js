import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  timeStamp = 0;
  HIGH_SCORE_KEY = 'highScore';
  high_score = 0;
  stageChange = true;
  currentStage = 1000;
  scoreRate = 1;
  nextStageLimit = 10;
  nextStage = 1001;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    //this.scoreTable = getGameAssets()['items'].data;
  }

  set HIGHSCORE(value)
  {
    this.high_score = value;
  }

  get HIGHSCORE()
  {
    return this.high_score;
  }
  
  update(deltaTime) {
    this.timeStamp += deltaTime * 0.001;
    this.score += deltaTime * 0.001 * this.scoreRate;
    // 점수가 100점 이상이 될 시 서버에 메세지 전송
    if (Math.floor(this.score) >= this.nextStageLimit && this.stageChange && Math.floor(this.timeStamp) >= 11) {
      this.stageChange = false;
      this.timeStamp = 0;
      sendEvent(11, { currentStage: this.currentStage, targetStage: this.nextStage, score : this.score });
    }
  }

  //아이템을 얻었을 때 발동한다.
  //id를 받는 것이기에 곧장 아이디를 보내는 것도 방법으로 보인다.
  getItem(itemId) {
    this.score += 10 * itemId;
    
  }

  reset() {
    this.score = 0;
    this.timeStamp = 0;
  }

    //게임이 끝났을 때 하이스코어인지 아닌지 확인한다.
  setHighScore(score = 0) {
    //여기는 로컬 정보에 기록되는 것. 
    //브라우저에 저장하는 방식이니까 이걸 접근해 보는 방식으로 접근해 보도록 하자.
    //localstorage가 아니라 랭킹을 가지고 있도록.
    //this.high_score
    //const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > this.high_score) {
      //최대값이 갱신되었을 때만 점수 갱신이 되도록 해보자.
      //localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
      this.high_score = Math.floor(this.score);
      sendEvent(12, { score : this.high_score });
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(this.high_score);
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
