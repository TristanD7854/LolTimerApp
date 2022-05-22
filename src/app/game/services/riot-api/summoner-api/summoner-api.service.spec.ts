import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RiotApiService } from '../riot-api.service';

import { SummonerApiService } from './summoner-api.service';

import summonerInformation from 'src/app/game/services/riot-api/summoner-api/mockData/deferlis.json';
import summonerInformationNotFound from 'src/app/game/services/riot-api/summoner-api/mockData/summonerNotFound.json';

import { of, throwError } from 'rxjs';
import { ErrorMessages } from '../../../models/errors/errors';

describe('SummonerApiService', () => {
  let service: SummonerApiService;
  let riotApiService: RiotApiService;
  const summonerName = 'Deferlis';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: RiotApiService,
          useValue: {
            callBackend: () => of(summonerInformation)
          }
        }
      ]
    });
    service = TestBed.inject(SummonerApiService);
    riotApiService = TestBed.inject(RiotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSummonerInformation', () => {
    it('should call backend', (done) => {
      jest.spyOn(riotApiService, 'callBackend');

      service.getSummonerInformation(summonerName).subscribe(() => {
        done();
      });

      expect(riotApiService.callBackend).toHaveBeenCalledWith('summoner', '?summonerName=Deferlis');
    });

    describe('if summoner exists', () => {
      it('should return the backend data', (done) => {
        service.getSummonerInformation(summonerName).subscribe((res) => {
          expect(res).toEqual(summonerInformation);

          done();
        });
      });
    });

    describe('if summoner doesnt exist', () => {
      it('should return an error', (done) => {
        riotApiService.callBackend = jest
          .fn()
          .mockReturnValue(
            throwError(() => new HttpErrorResponse({ error: summonerInformationNotFound }))
          );

        service.getSummonerInformation(summonerName).subscribe({
          error: (e) => {
            expect(e.message).toEqual(ErrorMessages.summonerNotFound);
            done();
          }
        });
      });
    });
  });
});
