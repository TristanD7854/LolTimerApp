import { giveCooldown } from './cooldown-helper';

describe('Coodldown helper', () => {
  it('return', () => {
    //300*(1-(1 - 1/(1+18/100))) = 254.237
    expect(giveCooldown(300, 18)).toEqual(254);
  });
});
