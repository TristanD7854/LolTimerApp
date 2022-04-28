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
        if (err.error.status.message === 'Data not found - summoner not found') {
          return throwError(() => new Error(ErrorMessages.summonerNotFound));
        }

        return throwError(() => new Error(ErrorMessages.unknownError));
      })
    );
  }
}
