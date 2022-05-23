import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentGameParticipant } from '../../../models/riot-api/spectator.model';
import { Summ, Summs } from '../../../models/summs/summs.model';
import { RunesService } from '../runes/runes.service';
import { SaveService } from '../../save/save.service';
import { LolResourcesService } from '../lol-resources.service';
import { giveCooldown } from 'src/app/game/helpers';

@Injectable({
  providedIn: 'root'
})
export class SummonerSpellsService {
  /*
  http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/summoner.json
  http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/SummonerFlash.png
  */
  private summsInfo: any;
  private isAram = false;

  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private lolResourcesService: LolResourcesService,
    private saveService: SaveService,
    private runesService: RunesService
  ) {}

  public initialize() {
    this.isAram = this.saveService.getCurrentGameInfo().gameMode == 'ARAM';

    // we don't use LanguageService as we would have to consider "Saut eclair" instead of Flash when typing "f top"
    this.lolResourcesService.callDDragonCdnDataEn('summoner.json').subscribe((res) => {
      this.summsInfo = res;
      this.isReady$.next(true);
    });
  }

  public getSumms(participant: CurrentGameParticipant): Summs {
    const hasCosmicInsight = this.runesService.hasCosmicInsight(participant);
    const summonerSpellHaste = hasCosmicInsight ? 18 : 0;
    // todowhenlcu : lucidity boots reduces the cd

    let summ1!: Summ;
    let summ2!: Summ;

    for (const summonerSpell in this.summsInfo.data) {
      // verify that it is its own property
      if (Object.prototype.hasOwnProperty.call(this.summsInfo.data, summonerSpell)) {
        if (this.summsInfo.data[summonerSpell].key == participant.spell1Id) {
          const summonerSpellData = this.summsInfo.data[summonerSpell];
          summ1 = {
            name: summonerSpellData.name,
            image: this.lolResourcesService.getDDragonImageUrl(
              `img/spell/${summonerSpellData.image.full}`
            ),
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
            image: this.lolResourcesService.getDDragonImageUrl(
              `img/spell/${summonerSpellData.image.full}`
            ),
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
