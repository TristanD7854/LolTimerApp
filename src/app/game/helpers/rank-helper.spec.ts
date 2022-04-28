import { getRankInNumber } from './rank-helper';

describe('Rank helper', () => {
  it('return', () => {
    expect(getRankInNumber('I')).toEqual(1);
  });
});
