import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentGameInfo, CurrentGameParticipant } from '../../models/riot-api/spectator.model';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private currentGameInfo!: CurrentGameInfo;

  public mainParticipantName!: string;
  public hasSavedCurrentGameInfoSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public allyTeam!: CurrentGameParticipant[];
  public enemyTeam!: CurrentGameParticipant[];

  public setCurrentGameInfo(currentGameInfo: CurrentGameInfo): void {
    this.currentGameInfo = currentGameInfo;
    this.hasSavedCurrentGameInfoSubject$.next(true);
  }

  public setMainParticipant(name: string): void {
    this.mainParticipantName = name;
  }

  public getCurrentGameInfo(): CurrentGameInfo {
    return this.currentGameInfo;
  }
}
