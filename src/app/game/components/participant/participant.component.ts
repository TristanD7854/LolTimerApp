import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Champion } from '../../models/riot-api/champion.model';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Settings } from '../../models/settings/settings.model';
import { ChampionsService } from '../../services/champions/champions.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  // ask champions-service + items-service + lcu-service to get total max hp of every champion, lifesteal, mr, armor ...
  // display items
  // another component will display if no anti heal vs lots of healing champs/items

  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public champion!: Champion;
  //public showSummonerNames!: boolean;
  public showSummonerNames$!: Observable<boolean>;

  constructor(
    private championsService: ChampionsService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    const championName = this.championsService.getChampionName(
      this.currentGameParticipant.championId
    );

    this.showSummonerNames$ = this.settingsService.settingsSubject.pipe(
      map((settings: Settings) => {
        return settings.showSummonerNames;
      })
    );

    /*
    this.settingsService.getSettings().subscribe((res: Settings) => {
      console.log('res found !!');
      this.showSummonerNames = res.showSummonerNames;
    });
    */

    /*
      this.settingsService
      .getSettings()
      .pipe(() => {
        return of(true);
      });
      */

    this.championsService
      .getChampion(championName)
      .subscribe((resp: Champion) => {
        //console.log('champion returned = ' + JSON.stringify(resp));
        this.champion = resp;
      });

    // display profileIconId
    // call championsService and get image
    // call RunesService, SummonerSpellsService and get name/images

    // todo : use an observer to subscribe to SettingsComponent, where we can change "show summoner name". Default is "no".

    //console.log(this.currentGameParticipant);
  }
}
