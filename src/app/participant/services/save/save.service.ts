import { Injectable } from '@angular/core';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private currentGameInfo!: CurrentGameInfo;

  public setCurrentGameInfo(currentGameInfo: CurrentGameInfo): void {
    this.currentGameInfo = currentGameInfo;
  }

  public getCurrentGameInfo(): CurrentGameInfo {
    return this.currentGameInfo;
  }
}
