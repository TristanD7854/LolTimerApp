import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { getRankInNumber } from '../../helpers';
import { CustomErrorMessage } from '../../models/errors/errors';
import { RankInformation } from '../../models/riot-api/league.model';
import { CurrentGameInfo, CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { RankApiService } from '../riot-api/rank-api/rank-api.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private currentGameInfo!: CurrentGameInfo;

  public mainParticipant!: CurrentGameParticipant;
  public mainParticipantName!: string;
  public hasSavedCurrentGameInfoSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public allyTeam!: CurrentGameParticipant[];
  public enemyTeam!: CurrentGameParticipant[];
  public ranks: Map<string, string> = new Map();

  constructor(private rankApiService: RankApiService) {}

  public setCurrentGameInfo(currentGameInfo: CurrentGameInfo): void {
    this.currentGameInfo = currentGameInfo;
    this.hasSavedCurrentGameInfoSubject$.next(true);
    this.setRanks();
  }

  public setMainParticipant(name: string): void {
    this.mainParticipantName = name;

    this.currentGameInfo.participants.forEach((participant: CurrentGameParticipant) => {
      if (participant.summonerName == name) {
        this.mainParticipant = participant;
      }
    });
  }

  public getCurrentGameInfo(): CurrentGameInfo {
    return this.currentGameInfo;
  }

  private setRanks(): void {
    this.currentGameInfo.participants.forEach((participant: CurrentGameParticipant) => {
      this.rankApiService
        .getRankInformationWithSummonerName(participant.summonerName)
        .subscribe((res) => {
          if (res instanceof CustomErrorMessage) {
            throwError(() => new Error(res.message));
          } else {
            let rank = 'N\\A';
            res.forEach((rankInformation: RankInformation) => {
              if (rankInformation.queueType == 'RANKED_SOLO_5x5') {
                rank = rankInformation.tier[0] + getRankInNumber(rankInformation.rank);
              }

              this.ranks.set(participant.summonerName, rank);
            });
          }
        });
    });
  }
}
