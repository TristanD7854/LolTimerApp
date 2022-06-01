import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';

import * as positionHelper from 'src/app/game/helpers';
import * as timeHelper from 'src/app/game/helpers';
import * as summonerSpellHelper from 'src/app/game/helpers';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CommandService', () => {
  let service: CommandService;
  const command = 'f m 30';

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    service = TestBed.inject(CommandService);

    jest.spyOn(positionHelper, 'getPositionFullName').mockReturnValue('MID');
    jest.spyOn(timeHelper, 'getTimeOfUse').mockReturnValue(20);
    jest.spyOn(summonerSpellHelper, 'getSummonerSpellFullName').mockReturnValue('Flash');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with a correct command', () => {
    it('should process command and return', () => {
      expect(service.processCommand(command)).toEqual({ command: command });
    });

    it('should process command and submit event', (done) => {
      service.enemyTeamSummonerSubject$.subscribe((res) => {
        expect(res).toStrictEqual(['MID', 'Flash', 20]);
        done();
      });

      service.processCommand(command);
    });
  });

  describe('with an incorrect command', () => {
    it('should not process command', () => {
      jest.spyOn(positionHelper, 'getPositionFullName').mockReturnValue(null);

      expect(service.processCommand(command)).toEqual({
        command: command,
        error: 'Command not understood'
      });
    });
  });
});
