import { Component, OnInit } from '@angular/core';
import { GameLengthService } from '../../services/game-length/game-length.service';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  constructor(public gameLengthService: GameLengthService) {}

  ngOnInit(): void {
    this.gameLengthService.start();
  }
}
