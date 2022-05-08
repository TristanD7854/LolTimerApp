import { Component, Input, OnInit } from '@angular/core';
import { getRankInNumber } from '../../helpers';
import { CustomErrorMessage } from '../../models/errors/errors';
import { RankInformation } from '../../models/riot-api/league.model';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { RankApiService } from '../../services/riot-api/rank-api/rank-api.service';

@Component({
  selector: 'participant-rank',
  templateUrl: './participant-rank.component.html',
  styleUrls: ['./participant-rank.component.scss']
})
export class ParticipantRankComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public rank!: string;

  constructor(private rankApiService: RankApiService) {}

  ngOnInit(): void {
    this.rankApiService
      .getRankInformationWithSummonerName(this.currentGameParticipant.summonerName)
      .subscribe((res) => {
        if (res instanceof CustomErrorMessage) {
          // todo
          //console.log('manage error');
        } else {
          res.forEach((rankInformation: RankInformation) => {
            if (rankInformation.queueType == 'RANKED_SOLO_5x5') {
              this.rank = rankInformation.tier[0] + getRankInNumber(rankInformation.rank);
            }
          });
        }
      });
  }
}
