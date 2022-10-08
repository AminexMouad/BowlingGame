export class BallThrow {
  constructor(score, bonus) {
    this.score = score;
    this.bonus = bonus;
  }
}

export default class Frame {
  constructor() {
    this.ballThrows = [];
    this.finalScore = 0;
    this.maxThrows = 2;
  }

  getBallThrows() {
    return this.ballThrows;
  }

  getFinalScore() {
    return this.finalScore;
  }

  setFinalScore(score) {
    this.finalScore = score;
  }

  setBallThrows(pins) {
    if (this.ballThrows.length >= this.maxThrows) {
      throw new Error('Max throws reached');
    }

    this.ballThrows.push(new BallThrow(pins, false));
  }
}
