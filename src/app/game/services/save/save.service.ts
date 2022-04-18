import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private currentGameInfo!: CurrentGameInfo;
  public hasSavedCurrentGameInfoSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public setCurrentGameInfo(currentGameInfo: CurrentGameInfo): void {
    this.currentGameInfo = currentGameInfo;
    this.hasSavedCurrentGameInfoSubject.next(true);
  }

  public getCurrentGameInfo(): CurrentGameInfo {
    return this.currentGameInfo;
  }
}
