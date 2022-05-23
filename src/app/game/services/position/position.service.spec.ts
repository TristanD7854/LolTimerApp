import { TestBed } from '@angular/core/testing';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';

import { PositionService } from './position.service';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';
import mockCurrentGameParticipant2 from 'src/app/game/models/riot-api/mockCurrentGameParticipant2.json';
import * as positionHelper from 'src/app/game/helpers';

describe('PositionService', () => {
  let service: PositionService;

  const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;
  const currentGameParticipant2: CurrentGameParticipant = mockCurrentGameParticipant2;

  const team: Team = {
    members: [currentGameParticipant, currentGameParticipant2],
    isAllyTeam: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('swapPositionInTeam', () => {
    it('should call swapPositionInTeam', () => {
      jest.spyOn(positionHelper, 'swapPositions');
      jest.spyOn(positionHelper, 'getIndex').mockReturnValue(1);

      service.swapPositionInTeam(team, 0, 'JUNGLE');

      expect(positionHelper.swapPositions).toHaveBeenCalledWith(team, 0, 1);
    });

    it('should emit correct event', (done) => {
      jest.spyOn(positionHelper, 'getPosition').mockReturnValue('TOP');

      service.allyTeamSwapSubject$.subscribe((res) => {
        expect(res).toStrictEqual(['TOP', 'JUNGLE']);
        done();
      });

      service.swapPositionInTeam(team, 0, 'JUNGLE');
    });
  });
});
