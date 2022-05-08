import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { Summ } from '../../models/summs.model';

@Component({
  selector: 'summoner-spell',
  templateUrl: './summoner-spell.component.html',
  styleUrls: ['./summoner-spell.component.scss']
})
export class SummonerSpellComponent implements OnInit, OnDestroy {
  @Input()
  public summ$!: Observable<Summ>;

  @Input()
  public useSummSubject!: Subject<number>;

  public summ!: Summ;
  public timeLeft!: number;
  public summOpacity = '100%';
  public readonly summSoonUpTime = 20;

  private canStartTimer = true; // to avoid concurrency issue
  private interval$: Observable<number> = interval(1000);
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.summ$.subscribe((summ) => {
      this.summ = summ;
      this.timeLeft = this.summ.cooldown;
    });

    this.useSummSubject.subscribe((time) => {
      this.useSumm(time);
    });
  }

  //todo : grey out summ when not up, highlight it when up (red border)

  public useSumm(delay: number): void {
    if (!this.canStartTimer) return;
    this.canStartTimer = false;
    this.timeLeft = this.summ.cooldown - delay;
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    this.startTimer();
  }

  private startTimer(): void {
    this.summOpacity = '50%';
    setTimeout(() => {
      this.canStartTimer = true;
      this.subscription.add(
        this.interval$.subscribe(() => {
          this.timeLeft -= 1;
          if (this.timeLeft <= 0) {
            this.resetTimer();
          }
        })
      );
    }, 0);
  }

  private resetTimer(): void {
    this.summOpacity = '100%';
    this.subscription.unsubscribe();
    this.timeLeft = this.summ.cooldown;
  }

  public addTime(delay: number): void {
    if (this.timeLeft == this.summ.cooldown) {
      return;
    }
    if (this.timeLeft + delay > this.summ.cooldown) {
      return;
    }
    if (this.timeLeft - delay <= 0) {
      this.resetTimer();
      return;
    }
    this.timeLeft += delay;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
