import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SummonerApiService } from '../summoner-api/summoner-api.service';
import { SpectatorApiService } from './spectator-api.service';

import mockSummoner from 'src/app/game/services/riot-api/summoner-api/mockData/mockSummoner.json';
import mockSpectatorSummonerNotInGame from 'src/app/game/services/riot-api/spectator-api/mockData/mockSpectatorSummonerNotInGame.json';
import { of, throwError } from 'rxjs';
import { CustomErrorMessage, ErrorMessages } from 'src/app/game/models/errors/errors';
import { RiotApiService } from '../riot-api.service';

describe('SpectatoApiService', () => {
  let service: SpectatorApiService;
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
            getSummonerInformation: () => of(mockSummoner)
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
    service = TestBed.inject(SpectatorApiService);
    summonerApiService = TestBed.inject(SummonerApiService);
    riotApiService = TestBed.inject(RiotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentGameInfoWithSummonerName', () => {
    describe('with known summonerName', () => {
      it('should call backend', (done) => {
        jest.spyOn(riotApiService, 'callBackend');

        service.getCurrentGameInfoWithSummonerName(summonerName).subscribe(() => {
          done();
        });

        expect(riotApiService.callBackend).toHaveBeenCalledWith(
          'spectator',
          '?encryptedSummonerId=RCJk6taqtFd-n1dLZU1lYMCcufi-F139HNWm1wE-a2L6AI4'
        );
      });

      it('should manage the error if not in game', (done) => {
        riotApiService.callBackend = jest
          .fn()
          .mockReturnValue(
            throwError(() => new HttpErrorResponse({ error: mockSpectatorSummonerNotInGame }))
          );

        service.getCurrentGameInfoWithSummonerName(summonerName).subscribe((res) => {
          expect(res).toEqual(new CustomErrorMessage(ErrorMessages.summonerNotInGame));

          done();
        });
      });
    });

    it('with unknown summonerName', (done) => {
      summonerApiService.getSummonerInformation = jest
        .fn()
        .mockReturnValue(throwError(() => new Error(ErrorMessages.summonerNotFound)));

      service.getCurrentGameInfoWithSummonerName(summonerName).subscribe((res) => {
        expect(res).toEqual(new CustomErrorMessage(ErrorMessages.summonerNotFound));

        done();
      });
    });
  });
});
