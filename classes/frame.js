export default class Frame {
  constructor() {
    this.ballThrows = [];
    this.finalScore = 0;
    this.tempScore = 0;
    this.maxThrows = 2;
    this.isStrike = false;
    this.isSpare = false;
  }

  getBallThrows() {
    return this.ballThrows;
  }

  getFinalScore() {
    return this.finalScore;
  }

  getTempScore() {
    return this.tempScore;
  }

  getStrike() {
    return this.isStrike;
  }

  getSpare() {
    return this.isSpare;
  }

  markAsStrike() {
    this.isStrike = true;
  }

  markAsSpare() {
    this.isSpare = true;
  }

  setTempScore(score) {
    this.tempScore += score;
  }

  setFinalScore(score) {
    this.finalScore = score;
  }

  setBallThrows(pins) {
    if (this.ballThrows.length >= this.maxThrows) {
      throw new Error('Max throws reached');
    }

    this.ballThrows.push(pins);
  }
}
