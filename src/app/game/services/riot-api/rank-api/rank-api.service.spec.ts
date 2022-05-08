import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RankApiService } from './rank-api.service';

import summonerInformation from 'src/app/game/services/riot-api/summoner-api/mockData/deferlis.json';
import { SummonerApiService } from '../summoner-api/summoner-api.service';
import { of, throwError } from 'rxjs';
import { RiotApiService } from '../riot-api.service';
import { ErrorMessages } from 'src/app/game/models/errors/errors';
import { CustomErrorMessage } from '../../../models/errors/errors';

describe('RankService', () => {
  let service: RankApiService;
  let summonerApiService: SummonerApiService;
  let riotApiService: RiotApiService;
  const summonerName = 'Deferlis';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: SummonerApiService,
          useValue: {
            getSummonerInformation: () => {
              return of(summonerInformation);
            }
          }
        },
        {
          provide: RiotApiService,
          useValue: {
            callBackend: () => of({})
          }
        }
      ]
    });
    service = TestBed.inject(RankApiService);
    summonerApiService = TestBed.inject(SummonerApiService);
    riotApiService = TestBed.inject(RiotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRankInformationWithSummonerName', () => {
    it('with known summonerName', (done) => {
      jest.spyOn(riotApiService, 'callBackend');

      service.getRankInformationWithSummonerName(summonerName).subscribe(() => {
        done();
      });

      expect(riotApiService.callBackend).toHaveBeenCalledWith(
        'league',
        '?encryptedSummonerId=RCJk6taqtFd-n1dLZU1lYMCcufi-F139HNWm1wE-a2L6AI4'
      );
    });

    it('with unknown summonerName', (done) => {
      summonerApiService.getSummonerInformation = jest
        .fn()
        .mockReturnValue(throwError(() => new Error(ErrorMessages.summonerNotFound)));

      service.getRankInformationWithSummonerName(summonerName).subscribe((res) => {
        expect(res).toEqual(new CustomErrorMessage(ErrorMessages.summonerNotFound));

        done();
      });
    });
  });
});
