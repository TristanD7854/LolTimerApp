import { Rank } from './../../models/riot-api/league.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CustomErrorMessage } from '../../models/errors/errors';
import { RankInformation } from '../../models/riot-api/league.model';
import { RiotApiService } from '../riot-api/riot-api.service';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private backEndUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private riotApiService: RiotApiService) {}

  public getRankInformation(
    encryptedSummonerId: string,
    mock: boolean
  ): Observable<RankInformation[]> {
    let summonerV4Url = `${this.backEndUrl}/league/?encryptedSummonerId=${encryptedSummonerId}`;
    if (mock) {
      summonerV4Url = `${this.backEndUrl}/league/mock?encryptedSummonerId=${encryptedSummonerId}`;
    }

    return this.http.get<RankInformation[]>(summonerV4Url);
  }

  public getRankInformationWithSummonerName(
    summonerName: string,
    mock: boolean
  ): Observable<RankInformation[] | CustomErrorMessage> {
    return this.riotApiService.getSummonerInformation(summonerName, mock).pipe(
      catchError((err: Error) => {
        return of(new CustomErrorMessage(err.message));
      }),
      switchMap((res) => {
        if (res instanceof CustomErrorMessage) {
          //console.log('error found ici = ' + res.message);
          return of(new CustomErrorMessage(res.message));
        }

        return this.getRankInformation(res.id, mock).pipe(
          catchError((err: Error) => {
            //console.log('ici, on a : ' + JSON.stringify(err));

            return of(new CustomErrorMessage(err.message));
          })
        );
      })
    );
  }

  public getRankInNumber(rank: Rank): number {
    switch (rank) {
      case 'I':
        return 1;
      case 'II':
        return 2;
      case 'III':
        return 3;
      case 'IV':
        return 4;
    }
  }
}
