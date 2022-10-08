import Frame, { BallThrow } from '../classes/frame';

describe('Frame class', () => {
  it('should be defined', () => {
    const frame = new Frame();
    expect(frame).toBeDefined();
  });

  it('should have ballThrows and finalScore property', () => {
    const frame = new Frame();
    expect(frame.ballThrows).toBeDefined();
    expect(frame.finalScore).toBeDefined();
  });

  describe('getBallThrows method', () => {
    it('should be defined', () => {
      const frame = new Frame();
      expect(frame.getBallThrows).toBeDefined();
    });

    it('should return an array', () => {
      const frame = new Frame();
      expect(frame.getBallThrows()).toEqual([]);
    });
  });

  describe('setBallThrows method', () => {
    it('should be defined', () => {
      const frame = new Frame();
      expect(frame.setBallThrows).toBeDefined();
    });

    it('should add a ballThrow to the ballThrows array and expect the array length will be 1', () => {
      const frame = new Frame();
      const pins = 5;
      frame.setBallThrows(pins);
      expect(frame.getBallThrows().length).toBe(1);
    });

    it('should add a new ballThrow to the ballThrows array and expect the ballThrow to be instance of BallThrow class', () => {
      const frame = new Frame();
      const pins = 5;
      frame.setBallThrows(pins);
      expect(frame.getBallThrows()[0]).toBeInstanceOf(BallThrow);
    });

    it('should throw Error if ballThrows length is above maxThrows', () => {
      const frame = new Frame();
      const pins = 5;
      frame.setBallThrows(pins);
      frame.setBallThrows(pins);
      expect(() => frame.setBallThrows(pins)).toThrow(Error);
    });
  });

  describe('getFinalScore method', () => {
    it('should be defined', () => {
      const frame = new Frame();
      expect(frame.getFinalScore).toBeDefined();
    });

    it('should return a number', () => {
      const frame = new Frame();
      expect(frame.getFinalScore()).toEqual(0);
    });
  });
});
