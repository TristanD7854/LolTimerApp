import { Component, OnInit } from '@angular/core';
import { combineLatestWith } from 'rxjs';
import { ChampionsService } from './game/services/champions/champions.service';
import { RunesService } from './game/services/runes/runes.service';
import { SaveService } from './game/services/save/save.service';
import { SummonerSpellsService } from './game/services/summoner-spells/summoner-spells.service';
import { VersionService } from './game/services/version/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private versionService: VersionService,
    private saveService: SaveService,
    private championsService: ChampionsService,
    private runesService: RunesService,
    private summonerSpellsService: SummonerSpellsService
  ) {}

  ngOnInit(): void {
    const obsInitialize$ = this.versionService.initialize();
    const saveServiceIsReady$ = this.saveService.hasSavedCurrentGameInfoSubject;

    obsInitialize$
      .pipe(combineLatestWith(saveServiceIsReady$))
      .subscribe(([initialize, saveServiceIsReady]) => {
        if (saveServiceIsReady) {
          this.championsService.initialize();
          this.runesService.initialize();
          this.summonerSpellsService.initialize();
        }
      });
  }

  /*
  const interval$ = interval(5000);
  setTimeout(() =>
  {
    interval$.subscribe(value => console.log(value));
  }, 3000);
  */
}
