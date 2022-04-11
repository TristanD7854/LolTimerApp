import { Component, OnInit } from '@angular/core';
import {
  CurrentGameInfo,
  CurrentGameParticipant
} from '../../models/riot-api/spectator.model';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  public currentGameInfo!: CurrentGameInfo;
  public allyTeam!: CurrentGameParticipant[];
  public enemyTeam!: CurrentGameParticipant[];

  constructor(private saveService: SaveService) {}

  public ngOnInit(): void {
    this.currentGameInfo = this.saveService.getCurrentGameInfo();
    this.createTeams();
  }

  private createTeams(): void {
    this.allyTeam = this.currentGameInfo.participants.filter(
      (participant: CurrentGameParticipant) => participant.teamId == 200
    );
    this.enemyTeam = this.currentGameInfo.participants.filter(
      (participant: CurrentGameParticipant) => participant.teamId == 100
    );
  }
}
