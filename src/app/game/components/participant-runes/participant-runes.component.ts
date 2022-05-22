import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Runes } from '../../models/runes.model';
import { RunesService } from '../../services/lol-resources/runes/runes.service';

@Component({
  selector: 'participant-runes',
  templateUrl: './participant-runes.component.html',
  styleUrls: ['./participant-runes.component.scss']
})
export class ParticipantRunesComponent implements OnInit {
  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public runes!: Runes;

  constructor(private runesService: RunesService) {}

  public ngOnInit(): void {
    this.runesService.isReady$.subscribe((res) => {
      if (res) this.loadRunes();
    });
  }

  private loadRunes(): void {
    this.runes = this.runesService.getRunes(this.currentGameParticipant);
  }
}
