import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  constructor(private saveService: SaveService) {}

  public gameLength!: number;
  private maxGameDuration = 4500; // 1h15mn
  private spectatorDelay = 120;

  ngOnInit(): void {
    this.saveService.hasSavedCurrentGameInfoSubject.subscribe((resp) => {
      if (resp) this.startGameDuration();
    });
  }

  private startGameDuration(): void {
    this.gameLength =
      this.saveService.getCurrentGameInfo().gameLength + this.spectatorDelay;

    const interval$ = interval(1000);
    setTimeout(() => {
      interval$.subscribe(() => {
        this.gameLength += 1;
      });
    }, this.maxGameDuration);
  }
}
