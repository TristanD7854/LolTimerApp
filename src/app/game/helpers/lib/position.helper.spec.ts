import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';
import {
  getAllPositions,
  getIndex,
  getPosition,
  getPositionFullName,
  swapPositions
} from './position.helper';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/currentGameParticipant.json';
import mockCurrentGameParticipant2 from 'src/app/game/models/riot-api/currentGameParticipant2.json';

describe('Position helper', () => {
  describe('getPositionFullName', () => {
    it('return top', () => {
      expect(getPositionFullName('t')).toEqual('TOP');
    });

    it('return jungle', () => {
      expect(getPositionFullName('j')).toEqual('JUNGLE');
    });

    it('return mid', () => {
      expect(getPositionFullName('m')).toEqual('MID');
    });

    it('return adc', () => {
      expect(getPositionFullName('a')).toEqual('ADC');
    });

    it('return support', () => {
      expect(getPositionFullName('s')).toEqual('SUPPORT');
    });
  });

  describe('getPosition', () => {
    it('return top', () => {
      expect(getPosition(0)).toEqual('TOP');
    });
  });

  describe('getIndex', () => {
    it('return top', () => {
      expect(getIndex('TOP')).toEqual(0);
    });
  });

  describe('getAllPositions', () => {
    it('return all positions', () => {
      expect(getAllPositions()).toEqual(['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT']);
    });
  });

  describe('swapPositions', () => {
    const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;
    const currentGameParticipant2: CurrentGameParticipant = mockCurrentGameParticipant2;

    const team: Team = {
      members: [currentGameParticipant, currentGameParticipant2],
      isAllyTeam: true
    };

    it('correctly swap two participants in a team', () => {
      const nameFirstMember: string = team.members[0].summonerName;
      const nameSecondMember: string = team.members[1].summonerName;

      swapPositions(team, 0, 1);

      expect(team.members[0].summonerName).toEqual(nameSecondMember);
      expect(team.members[1].summonerName).toEqual(nameFirstMember);
      expect(team.members[0].summonerName).not.toEqual(team.members[1].summonerName); // to avoid duplicate names making the test useless
    });
  });
});
