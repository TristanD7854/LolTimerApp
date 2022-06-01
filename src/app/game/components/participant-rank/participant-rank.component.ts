import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'participant-rank',
  templateUrl: './participant-rank.component.html',
  styleUrls: ['./participant-rank.component.scss']
})
export class ParticipantRankComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public rank!: string;

  constructor(private saveService: SaveService) {}

  ngOnInit(): void {
    this.rank = this.saveService.ranks.get(this.currentGameParticipant.summonerName) ?? 'N\\A';
  }
}
