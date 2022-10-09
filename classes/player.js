import Frame from './frame.js';

export default class Player {
  constructor() {
    this.score = 0;
    this.frames = [];
    this.currentFrame = 0;
    this.maxFrames = 10;
  }

  roll(pins) {
    let frame;

    // if (this.frames.length > this.maxFrames) {
    //   throw new Error('You reached the max number of frames');
    // }

    if (this.frames.length === 0) {
      this.initRoll(frame, pins);
    } else {
      if (this.currentFrame === this.frames.length) {
        this.frames.push(new Frame());
      }
      frame = this.frames[this.currentFrame];
      if (frame.getBallThrows().length === 0) {
        frame.setBallThrows(pins);
        const previousFrame = this.frames[this.currentFrame - 1];

        if (pins === 10 && this.currentFrame < 10) {
          if (previousFrame.getSpare()) {
            this.calculateSpare(previousFrame, pins);
          }
          this.checkIfFrameIsStrike(frame, pins);
          return;
        }

        if (previousFrame.getStrike()) {
          this.calculateStrike(
            pins,
            'first',
            previousFrame,
            this.currentFrame > 9
          );
          return;
        }

        if (previousFrame.getSpare()) {
          this.calculateSpare(previousFrame, pins);
          return;
        }

        return;
      }

      if (frame.getBallThrows().length === 1) {
        this.secondBallThrow(frame, pins);
      }
    }
  }

  scoreE() {
    this.score = this.frames.reduce(
      (acc, frame) => acc + frame.getFinalScore(),
      0
    );

    return this.score;
  }

  initRoll(frame, pins) {
    frame = new Frame();
    frame.setBallThrows(pins);
    if (pins === 10) {
      this.checkIfFrameIsStrike(frame, pins);
    }

    this.frames.push(frame);
  }

  secondBallThrow(frame, pins) {
    frame.setBallThrows(pins);
    const frameTotalScore = frame
      .getBallThrows()
      .reduce((acc, ballThrow) => acc + ballThrow, 0);
    const previousFrame = this.frames[this.currentFrame - 1];
    if (this.currentFrame > 0 && previousFrame.getStrike()) {
      this.calculateStrike(pins, 'second', previousFrame);
    }

    this.checkIfFrameIsSpare(frame, frameTotalScore);
    this.currentFrame += 1;
    this.frames.push(new Frame());
  }

  checkIfFrameIsSpare(frame, frameScore) {
    if (frameScore === 10) {
      frame.markAsSpare();
      frame.setTempScore(10);
    } else if (frameScore < 10) {
      frame.setFinalScore(frameScore);
    }
  }

  checkIfFrameIsStrike(frame, pins) {
    if (pins === 10) {
      frame.markAsStrike();
      frame.setTempScore(pins);
      this.currentFrame += 1;
      return;
    }
  }

  calculateSpare(previousFrame, pins) {
    previousFrame.setTempScore(pins);
    previousFrame.setFinalScore(previousFrame.getTempScore());
  }

  calculateStrike(pins, throwBall, previousFrame, isLastFrame) {
    if (throwBall === 'first') {
      if (previousFrame.getStrike()) {
        previousFrame.setTempScore(pins);
        if (isLastFrame) {
          previousFrame.setFinalScore(previousFrame.getTempScore());
        }
      }
    } else if (throwBall === 'second') {
      if (previousFrame.getStrike()) {
        previousFrame.setTempScore(pins);
        previousFrame.setFinalScore(previousFrame.getTempScore());
      }
    }
  }
}
