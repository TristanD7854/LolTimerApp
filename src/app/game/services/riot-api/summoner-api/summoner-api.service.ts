import { Injectable } from '@angular/core';
import { SummonerDTO } from 'src/app/game/models/riot-api/summoner.model';
import { RiotApiService } from '../riot-api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessages } from 'src/app/game/models/errors/errors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummonerApiService {
  constructor(private riotApiService: RiotApiService) {}

  public getSummonerInformation(summonerName: string): Observable<SummonerDTO> {
    const riotApiServiceObs: Observable<SummonerDTO> = this.riotApiService.callBackend<SummonerDTO>(
      'summoner',
      `?summonerName=${summonerName}`
    );

    return riotApiServiceObs.pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('summoner-api.service, pipe : ' + JSON.stringify(err));

        if (err.error.status.message === 'Forbidden') {
          return throwError(() => new Error(ErrorMessages.apiKeyOutdated));
        }
        if (err.error.status.message === 'Data not found - summoner not found') {
          return throwError(() => new Error(ErrorMessages.summonerNotFound));
        }
        if (err.error.status.message === ErrorMessages.rateLimitExceeded) {
          return throwError(() => new Error(ErrorMessages.rateLimitExceeded));
        }

        return throwError(() => new Error(ErrorMessages.unknownError));
      })
    );
  }
}
