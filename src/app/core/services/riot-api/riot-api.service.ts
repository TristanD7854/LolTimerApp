import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SummonerDTO } from '../../models/riot-api/summoner.model';
import summonerDeferlis from './mock-data/Summoner-Deferlis.json';
import yossuneCurrentGameInfo from './mock-data/currentGameInfo-Yossune.json';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService
{
  private apiKey: string = "RGAPI-2abd82ff-4c4b-42db-aac6-d3fce6413afe"
  private riotApiUrl: string = "euw1.api.riotgames.com/lol"

  constructor(private http: HttpClient) { }

  public getSummonerInformation(summonerName: string): Observable<SummonerDTO>
  {
    let summonerV4Url: string = `https://${this.riotApiUrl}/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.apiKey}`;
    return this.http.get<SummonerDTO>(summonerV4Url);
  }

  public getMockSummonerInformation(summonerName: string): Observable<SummonerDTO>
  {
    let mockObs: Observable<SummonerDTO> = new Observable((subscriber) =>
    {
      setTimeout(() =>
      {
        subscriber.next(summonerDeferlis);
        subscriber.complete();
      }, 1000);
    });

    return mockObs;
  }

  public getCurrentGameInfo(encryptedSummonerId: string): Observable<CurrentGameInfo>
  {
    let activeGameSpectatorV4Url = `https://${this.riotApiUrl}/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${this.apiKey}`;
    return this.http.get<CurrentGameInfo>(activeGameSpectatorV4Url);
  }

  public getMockCurrentGameInfo(encryptedSummonerId: string): Observable<CurrentGameInfo>
  {
    let mockObs: Observable<CurrentGameInfo> = new Observable((subscriber) =>
    {
      setTimeout(() =>
      {
        subscriber.next(yossuneCurrentGameInfo);
        subscriber.complete();
      }, 1000);
    });

    return mockObs;
  }

  public getCurrentGameInfoWithSummonerName(summonerName: string): Observable<CurrentGameInfo>
  {
    return this.getSummonerInformation(summonerName).pipe(
      switchMap(summonerInfo =>
      {
        // todo : manage errors
        return this.getCurrentGameInfo(summonerInfo.id);
      })
    )
  }


}
