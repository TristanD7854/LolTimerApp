import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SaveService } from '../save/save.service';

@Injectable({
  providedIn: 'root'
})
export class GameLengthService {
  constructor(private saveService: SaveService) {}

  public gameLength!: number;
  private maxGameDuration = 4500; // 1h15mn
  private spectatorDelay = 120;

  public start(): void {
    this.saveService.hasSavedCurrentGameInfoSubject$.subscribe((res) => {
      if (res) this.startGameDuration();
    });
  }

  private startGameDuration(): void {
    this.gameLength = this.saveService.getCurrentGameInfo().gameLength + this.spectatorDelay;

    const interval$ = interval(1000);
    setTimeout(() => {
      interval$.subscribe(() => {
        this.gameLength += 1;
      });
    }, 0);
  }
}
