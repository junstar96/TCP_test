import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStage = 1;
  scoreRate = 1;
  nextStageLimit = 10;
  nextStage = 1001;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    //this.scoreTable = getGameAssets()['items'].data;
  }
  
  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.scoreRate;
    // 점수가 100점 이상이 될 시 서버에 메세지 전송
    if (Math.floor(this.score) === this.nextStageLimit && this.stageChange) {
      this.stageChange = false;
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
    }
  }

  //아이템을 얻었을 때 발동한다.
  //id를 받는 것이기에 곧장 아이디를 보내는 것도 방법으로 보인다.
  getItem(itemId) {
    console.log(this.scoreTable);
    

    this.score += 10 * itemId;
    
  }

  reset() {
    this.score = 0;
  }

  //게임이 끝났을 때 하이스코어인지 아닌지 확인한다.
  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
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
