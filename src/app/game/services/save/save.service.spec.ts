import { TestBed } from '@angular/core/testing';

import { SaveService } from './save.service';

import mockSpectator from 'src/app/game/services/riot-api/spectator-api/mockData/mockSpectator.json';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { RankApiService } from '../riot-api/rank-api/rank-api.service';

import mockRank from 'src/app/game/services/riot-api/rank-api/mockData/mockRank.json';

import * as rankHelper from 'src/app/game/helpers';
import { CustomErrorMessage } from '../../models/errors/errors';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SaveService', () => {
  let service: SaveService;
  let rankApiService: RankApiService;
  const currentGameInfo: CurrentGameInfo = mockSpectator;
  const tierFirstLetter = 'D';
  const rankNumber = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: RankApiService,
          useValue: {
            getRankInformationWithSummonerName: () => of(mockRank)
          }
        }
      ]
    });
    service = TestBed.inject(SaveService);
    rankApiService = TestBed.inject(RankApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCurrentGameInfo', () => {
    it('should set the currentGameInfo', () => {
      service.setCurrentGameInfo(currentGameInfo);

      expect(service.getCurrentGameInfo()).toEqual(currentGameInfo);
    });

    it('should set hasSavedCurrentGameInfoSubject to true', (done) => {
      service.hasSavedCurrentGameInfoSubject$.subscribe((res) => {
        expect(res).toEqual(true);
        done();
      });

      service.setCurrentGameInfo(currentGameInfo);
    });
  });

  describe('setRanks', () => {
    beforeEach(() => {
      jest.spyOn(rankHelper, 'getRankInNumber').mockReturnValue(rankNumber);
    });

    it('should call RankApiService getRankInformationWithSummonerName', () => {
      jest.spyOn(rankApiService, 'getRankInformationWithSummonerName');

      service.setCurrentGameInfo(currentGameInfo);

      expect(rankApiService.getRankInformationWithSummonerName).toHaveBeenCalledWith('Deferlis');
    });

    describe('if no error', () => {
      it('should set the correct rank', () => {
        service.setCurrentGameInfo(currentGameInfo);

        expect(service.ranks.get('Deferlis')).toEqual(tierFirstLetter + rankNumber);
      });
    });

    describe('if there is an error', () => {
      beforeEach(() => {
        jest
          .spyOn(rankApiService, 'getRankInformationWithSummonerName')
          .mockReturnValue(of(new CustomErrorMessage('error')));
      });
      it('should not set the rank', () => {
        service.setCurrentGameInfo(currentGameInfo);

        expect(service.ranks.get('Deferlis')).toBeUndefined();
      });
    });
  });
});
