import { Component, OnInit } from '@angular/core';
import { combineLatestWith } from 'rxjs';
import { SaveService } from './game/services/save/save.service';
import { SummonerSpellsService } from './game/services/lol-resources/summoner-spells/summoner-spells.service';
import { ChampionsService } from './game/services/lol-resources/champions/champions.service';
import { RunesService } from './game/services/lol-resources/runes/runes.service';
import { VersionService } from './game/services/lol-resources/version/version.service';

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
    this.versionService.initialize();
    const saveServiceIsReady$ = this.saveService.hasSavedCurrentGameInfoSubject$;

    this.versionService.hasRetrievedVersion$
      .pipe(combineLatestWith(saveServiceIsReady$))
      .subscribe(([, saveServiceIsReady]) => {
        if (saveServiceIsReady) {
          this.championsService.initialize();
          this.runesService.initialize();
          this.summonerSpellsService.initialize();
        }
      });
  }
}
