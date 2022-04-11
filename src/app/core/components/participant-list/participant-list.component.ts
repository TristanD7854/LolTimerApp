import { Component, OnInit } from '@angular/core';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  public currentGameInfo!: CurrentGameInfo;

  constructor(private saveService: SaveService) {}

  ngOnInit(): void {
    this.currentGameInfo = this.saveService.getCurrentGameInfo();
  }
}
