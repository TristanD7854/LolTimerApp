import { Component, Input, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { SummonerSpell, Summs, Summ } from '../../models/summs/summs.model';
import { SummonerSpellsService } from '../../services/lol-resources/summoner-spells/summoner-spells.service';

@Component({
  selector: 'participant-summs',
  templateUrl: './participant-summs.component.html',
  styleUrls: ['./participant-summs.component.scss']
})
export class ParticipantSummsComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  @Input()
  public useSummsSubject$!: Subject<[SummonerSpell, number]>;

  public useSumm1Subject$: Subject<number> = new Subject();
  public useSumm2Subject$: Subject<number> = new Subject();

  public summs!: Summs;
  // todolongafter : manage changing summs in game (spellbook)

  public summ1$: Subject<Summ> = new Subject<Summ>();
  public summ2$: Subject<Summ> = new Subject<Summ>();

  constructor(private summonerSpellsService: SummonerSpellsService) {}

  public ngOnInit(): void {
    this.summonerSpellsService.isReady$.subscribe((res) => {
      if (res) this.loadSummonerSpells();
    });
  }

  private loadSummonerSpells(): void {
    this.summs = this.summonerSpellsService.getSumms(this.currentGameParticipant);
    this.summ1$.next(this.summs.summ1);
    this.summ2$.next(this.summs.summ2);

    this.useSummsSubject$.subscribe(([summonerSpell, time]) => {
      this.useSummonerSpell(summonerSpell, time);
    });
  }

  private useSummonerSpell(summonerSpell: SummonerSpell, time: number): void {
    if (summonerSpell == this.summs.summ1.name) {
      this.useSumm1Subject$.next(time);
    } else if (summonerSpell == this.summs.summ2.name) {
      this.useSumm2Subject$.next(time);
    } else {
      throwError(() => new Error('Summ not found'));
    }
  }
}
