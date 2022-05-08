import { getTimeInSeconds, getTimeOfUse } from './time.helper';

describe('Coodldown helper', () => {
  it('return the time', () => {
    expect(getTimeInSeconds(['2', '20'])).toEqual(140);
  });

  describe('return the time of use as a delay', () => {
    it('when the time given is 9', () => {
      expect(getTimeOfUse(600, '9')).toEqual(60);
    });

    it('when the time given is 9,35', () => {
      expect(getTimeOfUse(600, '9,35')).toEqual(25);
    });

    it('when the time given is 9.35', () => {
      expect(getTimeOfUse(600, '9.35')).toEqual(25);
    });

    it('when the time given is 935', () => {
      expect(getTimeOfUse(600, '935')).toEqual(25);
    });

    it('when the time given is 11.35', () => {
      expect(getTimeOfUse(720, '11.35')).toEqual(25);
    });

    it('when the time given is 1135', () => {
      expect(getTimeOfUse(720, '1135')).toEqual(25);
    });

    it('when the time given is 20s', () => {
      expect(getTimeOfUse(600, '20s')).toEqual(20);
    });
  });

  describe('return null', () => {
    it('when the time given is negative', () => {
      expect(getTimeOfUse(600, '-20')).toBeNull();
      expect(getTimeOfUse(600, '-20s')).toBeNull();
    });

    it('when the time is in the future', () => {
      expect(getTimeOfUse(600, '11.00')).toBeNull();
    });

    it('when the timehas invalid format', () => {
      expect(getTimeOfUse(600, 'hello')).toBeNull();
    });
  });
});
