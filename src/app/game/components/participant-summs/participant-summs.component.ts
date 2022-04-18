import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Summs, Summ } from '../../models/summs.model';
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

  public summ1$: Subject<Summ> = new Subject<Summ>();
  public summ2$: Subject<Summ> = new Subject<Summ>();

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
    this.summ1$.next(this.summs.summ1);
    this.summ2$.next(this.summs.summ2);
  }
}
