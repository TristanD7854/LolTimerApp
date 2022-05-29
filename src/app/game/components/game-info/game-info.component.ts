import { Component, OnInit } from '@angular/core';
import { GameLengthService } from '../../services/game-length/game-length.service';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  constructor(public gameLengthService: GameLengthService, public saveService: SaveService) {}

  ngOnInit(): void {
    this.gameLengthService.start();
  }
}
