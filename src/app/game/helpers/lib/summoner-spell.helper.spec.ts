import { getSummonerSpellFullName } from './summoner-spell.helper';

describe('Summoner spell helper', () => {
  it('return flash', () => {
    expect(getSummonerSpellFullName('flash')).toEqual('Flash');
    expect(getSummonerSpellFullName('f')).toEqual('Flash');
  });
});
