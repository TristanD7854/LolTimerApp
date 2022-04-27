import { getTimeInSeconds } from './time-helper';

describe('Coodldown helper', () => {
  it('return', () => {
    expect(getTimeInSeconds(['2', '20'])).toEqual(140);
  });
});
