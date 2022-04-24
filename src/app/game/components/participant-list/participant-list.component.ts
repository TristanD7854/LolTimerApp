import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { useBackendMockData } from '../../constants/mock.constants';
import { CustomErrorMessage, ErrorMessages } from '../../models/errors/errors';
import { CurrentGameInfo, CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';
import { RiotApiService } from '../../services/riot-api/riot-api.service';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  public currentGameInfo!: CurrentGameInfo;
  public allyTeam!: Team;
  public enemyTeam!: Team;

  constructor(
    private saveService: SaveService,
    private route: ActivatedRoute,
    private riotApiService: RiotApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (this.currentGameInfo) {
      this.loadInfo();
    } else {
      const summonerName = this.route.snapshot.params['summonerName'];

      // todo : find way to factorise with block from search-summoner
      this.riotApiService
        .getCurrentGameInfoWithSummonerName(summonerName, useBackendMockData)
        .subscribe((res) => {
          //console.log('res ici = ' + JSON.stringify(res));

          if (res instanceof CustomErrorMessage) {
            // todo : use modal here
            if (res.message === ErrorMessages.summonerNotFound) {
              console.log('SUMMONER NOT FOUND');
            } else if (res.message === ErrorMessages.summonerNotInGame) {
              console.log('SUMMONER NOT IN GAME');
            } else {
              console.log('Other error, display message : ' + res.message);
            }
            this.router.navigateByUrl('');
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
}