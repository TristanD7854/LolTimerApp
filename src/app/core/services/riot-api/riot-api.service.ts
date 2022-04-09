import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SummonerDTO } from '../../models/riot-api/summoner.model';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private backEndUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  public getSummonerInformation(
    summonerName: string,
    mock: boolean
  ): Observable<SummonerDTO> {
    let summonerV4Url = `${this.backEndUrl}?summonerName=${summonerName}`;
    if (mock) {
      summonerV4Url = `${this.backEndUrl}/mock?summonerName=${summonerName}`;
    }

    // todo SummonerDTO | Error
    return this.http.get<SummonerDTO>(summonerV4Url).pipe(
      catchError((err) => {
        console.log('error catched ooooh');
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  public getCurrentGameInfo(
    encryptedSummonerId: string
  ): Observable<CurrentGameInfo> {
    const activeGameSpectatorV4Url = `${this.backEndUrl}?encryptedSummonerId=${encryptedSummonerId}`;
    // todo CurrentGameInfo | Error
    return this.http.get<CurrentGameInfo>(activeGameSpectatorV4Url);
  }

  public getCurrentGameInfoWithSummonerName(
    summonerName: string,
    mock: boolean
  ): Observable<CurrentGameInfo> {
    return this.getSummonerInformation(summonerName, mock).pipe(
      switchMap((summonerInfo) => {
        // todo : manage errors
        console.log('summ = ' + summonerInfo.name);
        return this.getCurrentGameInfo(summonerInfo.id);
      })
    );
  }
}
