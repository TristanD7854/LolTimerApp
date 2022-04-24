import { Component, Input, OnInit } from '@angular/core';
import { useBackendMockData } from '../../constants/mock.constants';
import { CustomErrorMessage } from '../../models/errors/errors';
import { RankInformation } from '../../models/riot-api/league.model';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { RankService } from '../../services/rank/rank.service';

@Component({
  selector: 'participant-rank',
  templateUrl: './participant-rank.component.html',
  styleUrls: ['./participant-rank.component.scss']
})
export class ParticipantRankComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public rank!: string;

  constructor(private rankService: RankService) {}

  ngOnInit(): void {
    this.rankService
      .getRankInformation(this.currentGameParticipant.summonerName, useBackendMockData)
      .subscribe((res) => {
        //console.log('res ici = ' + JSON.stringify(res));

        if (res instanceof CustomErrorMessage) {
          console.log('manage error');
        } else {
          res.forEach((rankInformation: RankInformation) => {
            if (rankInformation.queueType == 'RANKED_SOLO_5x5') {
              this.rank =
                rankInformation.tier[0] + this.rankService.getRankInNumber(rankInformation.rank);
            }
          });
        }
      });
  }
}
