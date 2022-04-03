import { Component, OnInit } from '@angular/core';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  public currentGameInfo!: CurrentGameInfo;

  constructor(private saveService: SaveService) {}

  ngOnInit(): void {
    this.currentGameInfo = this.saveService.getCurrentGameInfo();
  }
}
