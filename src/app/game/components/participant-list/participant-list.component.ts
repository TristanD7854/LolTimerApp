import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomErrorMessage, ErrorMessages } from '../../models/errors/errors';
import { CurrentGameInfo, CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';
import { SaveService } from '../../services/save/save.service';
import { SpectatorApiService } from '../../services/riot-api/spectator-api/spectator-api.service';

@Component({
  selector: 'participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  public currentGameInfo!: CurrentGameInfo;
  public allyTeam!: Team;
  public enemyTeam!: Team;

  public showModal = false;
  public headerModal = '';
  public textModal = '';

  constructor(
    private saveService: SaveService,
    private route: ActivatedRoute,
    private spectatorApiService: SpectatorApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (this.currentGameInfo) {
      this.loadInfo();
    } else {
      const summonerName = this.route.snapshot.params['summonerName'];
      this.spectatorApiService.getCurrentGameInfoWithSummonerName(summonerName).subscribe((res) => {
        if (res instanceof CustomErrorMessage) {
          if (res.message === ErrorMessages.summonerNotFound) {
            this.showModalWithText(
              '' + summonerName + ' : ' + res.message,
              'Maybe this summoner in not on EUW'
            );
          } else if (res.message === ErrorMessages.summonerNotInGame) {
            this.showModalWithText(res.message, '');
          } else {
            this.showModalWithText(res.message, '');
          }
        } else {
          this.saveService.setCurrentGameInfo(res);
          this.saveService.setMainParticipant(summonerName);
          this.loadInfo();
        }
      });
    }
  }

  private loadInfo(): void {
    this.currentGameInfo = this.saveService.getCurrentGameInfo();
    this.createTeams();
  }

  private createTeams(): void {
    const allyTeamMembers: CurrentGameParticipant[] = this.currentGameInfo.participants.filter(
      (participant: CurrentGameParticipant) => participant.teamId == 200
    );

    this.allyTeam = {
      members: allyTeamMembers,
      isAllyTeam: true
    };

    const enemyTeamMembers: CurrentGameParticipant[] = this.currentGameInfo.participants.filter(
      (participant: CurrentGameParticipant) => participant.teamId == 100
    );

    this.enemyTeam = {
      members: enemyTeamMembers,
      isAllyTeam: false
    };
  }

  public goBackToHome() {
    this.router.navigateByUrl('');
  }

  private showModalWithText(header: string, text: string): void {
    this.showModal = true;
    this.headerModal = header;
    this.textModal = text;
  }

  public hideModal() {
    this.showModal = false;
  }
}
