import Frame from '../classes/frame';
import Player from '../classes/player';

describe('Player class', () => {
  it('should be defined', () => {
    const player = new Player();
    expect(player).toBeDefined();
  });

  describe('roll method', () => {
    it('should be defined', () => {
      const player = new Player();
      expect(player.roll).toBeDefined();
    });

    it('should add a new frame to the frames array and expect the frames array length to be 1', () => {
      const player = new Player();
      const pins = 5;
      player.roll(pins);
      expect(player.frames.length).toBe(1);
    });

    it('should add a new frame to the frames array and expect the frame to be instance of Frame class', () => {
      const player = new Player();
      const pins = 5;
      player.roll(pins);
      expect(player.frames[0]).toBeInstanceOf(Frame);
    });

    // it('should throw Error if frames length is above maxFrames', () => {
    //   const player = new Player();
    //   const pins = 5;
    //   for (let i = 0; i < player.maxFrames; i++) {
    //     player.roll(pins);
    //     player.roll(pins);
    //   }
    //   expect(() => player.roll(pins)).toThrow(Error);
    // });

    it('should add a new frame to the frames array and expect the frame to have a ballThrows array with length 1', () => {
      const player = new Player();
      const pins = 5;
      player.roll(pins);
      expect(player.frames[0].getBallThrows().length).toBe(1);
    });

    it('should set score after frame both ballThrow score is below 10', () => {
      const player = new Player();
      player.roll(2);
      player.roll(5);
      const frame = player.frames[player.currentFrame];
      const frameTotalScore = frame
        .getBallThrows()
        .reduce((acc, ballThrow) => acc + ballThrow.score, 0);
      frame.setFinalScore(frameTotalScore);

      expect(player.frames[player.currentFrame].getFinalScore()).toBe(
        frameTotalScore
      );
    });
  });

  describe('initRoll method', () => {
    describe('checkIfFrameIsStrike method', () => {
      it('should set frame to isStrike if the firest throw hit all the 10 pins', () => {
        const player = new Player();
        player.roll(10);
        expect(player.frames[0].isStrike).toBeTruthy();
        expect(player.frames[0].tempScore).toBe(10);
        expect(player.currentFrame).toBe(1);
      });
    });
  });

  describe('calculateSpare method', () => {
    it('should summarize the next frame throw to the previous frame who has a spare', () => {
      const player = new Player();
      player.roll(2);
      player.roll(8);
      player.roll(6);
      const previousFrame = player.frames[player.currentFrame - 1];
      expect(previousFrame.getFinalScore()).toBe(16);
    });
  });

  describe('secondBallThrow method', () => {
    it('should increase currentFrame after the second roll', () => {
      const player = new Player();
      const pins = 5;
      player.roll(pins);
      player.roll(pins);
      expect(player.currentFrame).toBe(1);
    });

    it('should create new frame if the current frame ballThrow length is 2 ', () => {
      const player = new Player();
      player.roll(2);
      player.roll(5);
      player.roll(5);

      expect(player.frames.length).toBe(2);
    });

    describe('checkIfFrameIsSpare method', () => {
      it('should set frame to isSpare if the second throw hit all the remaining pins', () => {
        const player = new Player();
        player.roll(2);
        player.roll(8);
        expect(player.frames[0].isSpare).toBeTruthy();
        expect(player.frames[0].tempScore).toBe(10);
        expect(player.frames[0].finalScore).toBe(0);
      });
    });

    describe('calculateStrike method', () => {
      it('should set frame isStrike to true if pins is 10', () => {
        const player = new Player();
        const pins = 10;
        player.roll(pins);
        expect(player.frames[0].isStrike).toBe(true);
      });

      it('should setBallThrows of the frame after the strike', () => {
        const player = new Player();
        const pins = 10;
        player.roll(pins);
        expect(player.frames[0].getBallThrows()[0]).toBe(10);
      });

      it('should move to the next frame if pins is 10', () => {
        const player = new Player();
        const pins = 10;
        player.roll(pins);
        expect(player.currentFrame).toBe(1);
      });

      it('should create new frame after the player got a strike', () => {
        const player = new Player();
        const pins = 10;

        player.roll(pins);
        expect(player.frames.length).toBe(1);
      });

      it('should summarize the second ballThrow to the previous strike frame', () => {
        const player = new Player();
        const pins = 10;
        player.roll(pins);

        player.roll(5);

        player.roll(4);
        const previousFrame = player.frames[player.currentFrame - 2];

        expect(previousFrame.getFinalScore()).toBe(19);
      });
    });

    it('should summarize the next two ballThrows to the previous strike frame', () => {
      const player = new Player();
      const pins = 10;
      player.roll(5);
      player.roll(4);
      player.roll(pins);

      player.roll(5);

      player.roll(4);
      const previousFrame = player.frames[1];

      expect(previousFrame.getFinalScore()).toBe(19);
    });
  });

  describe('score method', () => {
    it('should summarize all the frames final score', () => {
      const player = new Player();
      //   1st frame
      player.roll(8);
      player.roll(2);
      // 2nd frame
      player.roll(5);
      player.roll(5);
      // 3rd frame
      player.roll(2);
      player.roll(3);
      // 4th frame
      player.roll(10);
      // 5th frame
      player.roll(2);
      player.roll(8);
      // 6th frame
      player.roll(8);
      player.roll(2);
      // 7th frame
      player.roll(8);
      player.roll(2);
      // 8th frame
      player.roll(2);
      player.roll(0);
      // 9th frame
      player.roll(3);
      player.roll(7);
      // 10th frame
      player.roll(8);
      player.roll(2);
      player.roll(10);

      const playerScore = player.scoreE();

      expect(playerScore).toBe(140);
    });
  });
});
