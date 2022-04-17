import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { CustomErrorMessage, ErrorMessages } from '../../models/errors/errors';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SummonerDTO } from '../../models/riot-api/summoner.model';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private backEndUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public getSummonerInformation(
    summonerName: string,
    mock: boolean
  ): Observable<SummonerDTO> {
    let summonerV4Url = `${this.backEndUrl}/summoner/?summonerName=${summonerName}`;
    if (mock) {
      summonerV4Url = `${this.backEndUrl}/summoner/mock?summonerName=${summonerName}`;
    }

    return this.http.get<SummonerDTO>(summonerV4Url).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(
          'In getSummonerInformation, err.error = ' + JSON.stringify(err.error)
        );
        if (
          err.error.status.message === 'Data not found - summoner not found'
        ) {
          return throwError(() => new Error(ErrorMessages.summonerNotFound));
        }

        return throwError(() => new Error(ErrorMessages.unknownError));
      })
    );
  }

  public getCurrentGameInfo(
    encryptedSummonerId: string,
    mock: boolean
  ): Observable<CurrentGameInfo> {
    let activeGameSpectatorV4Url = `${this.backEndUrl}/spectator/?encryptedSummonerId=${encryptedSummonerId}`;
    if (mock) {
      activeGameSpectatorV4Url = `${this.backEndUrl}/spectator/mock?encryptedSummonerId=${encryptedSummonerId}`;
    }

    return this.http.get<CurrentGameInfo>(activeGameSpectatorV4Url).pipe(
      catchError((err: HttpErrorResponse) => {
        //console.log('In getCurrentGameInfo, err.error = ' + JSON.stringify(err.error));
        if (
          err.error.status.message === ErrorMessages.summonerEncryptedIdNotFound
        ) {
          return throwError(
            () => new Error(ErrorMessages.summonerEncryptedIdNotFound)
          );
          // No idea how to manage it
        }
        if (err.error.status.message === 'Data not found') {
          return throwError(() => new Error(ErrorMessages.summonerNotInGame));
          // No idea how to manage it
        }

        return throwError(() => new Error(ErrorMessages.unknownError));
      })
    );
  }

  public getCurrentGameInfoWithSummonerName(
    summonerName: string,
    mock: boolean
  ): Observable<CurrentGameInfo | CustomErrorMessage> {
    return this.getSummonerInformation(summonerName, mock).pipe(
      catchError((err: Error) => {
        return of(new CustomErrorMessage(err.message));
      }),
      switchMap((res) => {
        if (res instanceof CustomErrorMessage) {
          //console.log('error found ici = ' + res.message);
          return of(new CustomErrorMessage(res.message));
        }

        return this.getCurrentGameInfo(res.id, mock).pipe(
          catchError((err: Error) => {
            //console.log('ici, on a : ' + JSON.stringify(err));

            return of(new CustomErrorMessage(err.message));
          })
        );
      })
    );
  }
}
