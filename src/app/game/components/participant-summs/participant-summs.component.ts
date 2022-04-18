import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Summs } from '../../models/summs.model';
import { SummonerSpellsService } from '../../services/summoner-spells/summoner-spells.service';

@Component({
  selector: 'participant-summs',
  templateUrl: './participant-summs.component.html',
  styleUrls: ['./participant-summs.component.scss']
})
export class ParticipantSummsComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public summs!: Summs;
  // todoafter : manage changing summs in game (spellbook)

  constructor(private summonerSpellsService: SummonerSpellsService) {}

  public ngOnInit(): void {
    this.summonerSpellsService.isReady.subscribe((resp) => {
      if (resp) this.loadSummonerSpells();
    });
  }

  private loadSummonerSpells(): void {
    this.summs = this.summonerSpellsService.getSumms(
      this.currentGameParticipant
    );
  }
}
