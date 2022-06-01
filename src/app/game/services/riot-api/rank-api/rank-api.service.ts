import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CustomErrorMessage } from '../../../models/errors/errors';
import { RankInformation } from '../../../models/riot-api/league.model';
import { RiotApiService } from '../riot-api.service';
import { SummonerApiService } from '../summoner-api/summoner-api.service';

@Injectable({
  providedIn: 'root'
})
export class RankApiService {
  constructor(
    private riotApiService: RiotApiService,
    private summonerApiService: SummonerApiService
  ) {}

  private getRankInformation(encryptedSummonerId: string): Observable<RankInformation[]> {
    return this.riotApiService.callBackend<RankInformation[]>(
      'league',
      `?encryptedSummonerId=${encryptedSummonerId}`
    );
  }

  public getRankInformationWithSummonerName(
    summonerName: string
  ): Observable<RankInformation[] | CustomErrorMessage> {
    //console.log('call getRankInformationWithSummonerName with ' + summonerName);
    return this.summonerApiService.getSummonerInformation(summonerName).pipe(
      catchError((err: Error) => {
        return of(new CustomErrorMessage(err.message));
      }),
      switchMap((res) => {
        if (res instanceof CustomErrorMessage) {
          return of(new CustomErrorMessage(res.message));
        }

        return this.getRankInformation(res.id).pipe(
          catchError((err: Error) => {
            return of(new CustomErrorMessage(err.message));
          })
        );
      })
    );
  }
}
