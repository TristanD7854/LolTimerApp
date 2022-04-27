import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { giveCooldown } from '../../helpers/cooldown-helper';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Summ, Summs } from '../../models/summs.model';
import { LanguageService } from '../language/language.service';
import { RunesService } from '../runes/runes.service';
import { SaveService } from '../save/save.service';
import { VersionService } from '../version/version.service';

@Injectable({
  providedIn: 'root'
})
export class SummonerSpellsService {
  /*
  http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/summoner.json
  http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/SummonerFlash.png
  */

  private summsJsonUrl!: string;
  private summsInfo: any;
  private isAram = false;

  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private saveService: SaveService,
    private runesService: RunesService,
    private languageService: LanguageService
  ) {}

  public initialize() {
    this.summsJsonUrl = `${this.versionService.dataDragonUrl}/data/en_US/summoner.json`;
    // we don't use LanguageService as we would have to consider "Saut eclair" instead of Flash when typing "f top"
    this.isAram = this.saveService.getCurrentGameInfo().gameMode == 'ARAM';

    this.getSummsInfo().subscribe((resp) => {
      this.summsInfo = resp;
      this.isReady$.next(true);
    });
  }

  public getSummsInfo(): Observable<any> {
    return this.http.get<any>(this.summsJsonUrl);
  }

  public getSumms(participant: CurrentGameParticipant): Summs {
    const hasCosmicInsight = this.runesService.hasCosmicInsight(participant);
    const summonerSpellHaste = hasCosmicInsight ? 18 : 0;
    // todowhenlcu : lucidity boots reduces the cd

    // call rune service

    let summ1!: Summ;
    let summ2!: Summ;

    for (const summonerSpell in this.summsInfo.data) {
      // verify that its own property
      if (Object.prototype.hasOwnProperty.call(this.summsInfo.data, summonerSpell)) {
        if (this.summsInfo.data[summonerSpell].key == participant.spell1Id) {
          const summonerSpellData = this.summsInfo.data[summonerSpell];
          summ1 = {
            name: summonerSpellData.name,
            image: `${this.versionService.dataDragonUrl}/img/spell/${summonerSpellData.image.full}`,
            cooldown: giveCooldown(
              summonerSpellData.cooldown[0],
              summonerSpellHaste + (this.isAram ? 70 : 0)
            )
          };
        }
        if (this.summsInfo.data[summonerSpell].key == participant.spell2Id) {
          const summonerSpellData = this.summsInfo.data[summonerSpell];
          summ2 = {
            name: summonerSpellData.name,
            image: `${this.versionService.dataDragonUrl}/img/spell/${summonerSpellData.image.full}`,
            cooldown: giveCooldown(
              summonerSpellData.cooldown[0],
              summonerSpellHaste + (this.isAram ? 70 : 0)
            )
          };
        }
      }
    }

    return {
      summ1: summ1,
      summ2: summ2
    };
  }
}
