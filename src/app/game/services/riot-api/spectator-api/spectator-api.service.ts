import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { CustomErrorMessage, ErrorMessages } from 'src/app/game/models/errors/errors';
import { CurrentGameInfo } from 'src/app/game/models/riot-api/spectator.model';
import { RiotApiService } from '../riot-api.service';
import { SummonerApiService } from '../summoner-api/summoner-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpectatorApiService {
  constructor(
    private riotApiService: RiotApiService,
    private summonerApiService: SummonerApiService
  ) {}

  private getCurrentGameInfoWithSummonerId(
    encryptedSummonerId: string
  ): Observable<CurrentGameInfo> {
    const riotApiServiceObs: Observable<CurrentGameInfo> =
      this.riotApiService.callBackend<CurrentGameInfo>(
        'spectator',
        `?encryptedSummonerId=${encryptedSummonerId}`
      );

    return riotApiServiceObs.pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.status.message === ErrorMessages.summonerEncryptedIdNotFound) {
          return throwError(() => new Error(ErrorMessages.summonerEncryptedIdNotFound));
        }
        if (err.error.status.message === 'Data not found') {
          return throwError(() => new Error(ErrorMessages.summonerNotInGame));
        }

        return throwError(() => new Error(ErrorMessages.unknownError));
      })
    );
  }

  public getCurrentGameInfoWithSummonerName(
    summonerName: string
  ): Observable<CurrentGameInfo | CustomErrorMessage> {
    return this.summonerApiService.getSummonerInformation(summonerName).pipe(
      catchError((err: Error) => {
        return of(new CustomErrorMessage(err.message));
      }),
      switchMap((res) => {
        if (res instanceof CustomErrorMessage) {
          return of(new CustomErrorMessage(res.message));
        }

        return this.getCurrentGameInfoWithSummonerId(res.id).pipe(
          catchError((err: Error) => {
            return of(new CustomErrorMessage(err.message));
          })
        );
      })
    );
  }
}
