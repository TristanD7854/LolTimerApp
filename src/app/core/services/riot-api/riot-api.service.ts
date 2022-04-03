import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SummonerDTO } from '../../models/riot-api/summoner.model';
import summonerYossune from './mock-data/Summoner-Yossune.json';
import yossuneCurrentGameInfo from './mock-data/currentGameInfo-Yossune.json';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private apiKey = 'RGAPI-f0f56bca-f97b-4d8c-9351-7c15a9d048f1';
  private riotApiUrl = 'euw1.api.riotgames.com/lol';

  constructor(private http: HttpClient) {}

  public getSummonerInformation(summonerName: string): Observable<any> {
    const summonerV4Url = `https://${this.riotApiUrl}/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.apiKey}`;
    return this.http.get<any>(summonerV4Url).pipe(
      catchError((err) => {
        console.log('error catched ooooh');
        console.log(err);
        console.log(err.status);
        return throwError(() => err);
      })
    );
  }

  public getMockSummonerInformation(): Observable<SummonerDTO> {
    const mockObs: Observable<SummonerDTO> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(summonerYossune);
        subscriber.complete();
      }, 1000);
    });

    return mockObs;
  }

  public getCurrentGameInfo(
    encryptedSummonerId: string
  ): Observable<CurrentGameInfo> {
    const activeGameSpectatorV4Url = `https://${this.riotApiUrl}/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${this.apiKey}`;
    console.log('middle getCurrentGameInfo');
    return this.http.get<CurrentGameInfo>(activeGameSpectatorV4Url);
  }

  public getMockCurrentGameInfo(): Observable<CurrentGameInfo> {
    const mockObs: Observable<CurrentGameInfo> = new Observable(
      (subscriber) => {
        setTimeout(() => {
          subscriber.next(yossuneCurrentGameInfo);
          subscriber.complete();
        }, 1000);
      }
    );

    return mockObs;
  }

  public getCurrentGameInfoWithSummonerName(
    summonerName: string,
    isRealData: boolean
  ): Observable<CurrentGameInfo> {
    if (isRealData) {
      return this.getSummonerInformation(summonerName).pipe(
        switchMap((summonerInfo) => {
          // todo : manage errors
          console.log('summ = ' + summonerInfo.name);
          return this.getCurrentGameInfo(summonerInfo.id);
        })
      );
    } else {
      return this.getMockSummonerInformation().pipe(
        switchMap((summonerInfo) => {
          // todo : manage errors
          console.log('summ = ' + summonerInfo.name);
          return this.getMockCurrentGameInfo();
        })
      );
    }
  }
}
