import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Champion, Passive, Spell } from 'src/app/game/models/champion.model';
import { LolResourcesService } from '../lol-resources.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  // http://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/champion/Aatrox.json
  // https://developer.riotgames.com/docs/lol
  // http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/Aatrox.png

  private allChampionInfo: any;

  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private lolResourcesService: LolResourcesService) {}

  public initialize() {
    this.lolResourcesService.callDDragonCdnData<any>('champion.json').subscribe((resp) => {
      this.allChampionInfo = resp;
      this.isReady$.next(true);
    });
  }

  public getChampionName(id: number): string {
    for (const championName in this.allChampionInfo.data) {
      // verify that its own property
      if (Object.prototype.hasOwnProperty.call(this.allChampionInfo.data, championName)) {
        if (this.allChampionInfo.data[championName].key == id) {
          return championName;
        }
      }
    }
    return 'Champion not found'; // todo : returns error instead
  }

  public getChampion(championName: string): Observable<Champion> {
    return this.lolResourcesService.callDDragonCdnData<any>(`champion/${championName}.json`).pipe(
      map((response) => {
        const championData = response.data[championName];
        const spells: Spell[] = [];

        for (let index = 0; index < 4; index++) {
          const spellData = championData.spells[index];

          const spell: Spell = {
            name: spellData.name,
            image: this.lolResourcesService.getDDragonImageUrl(`img/spell/${spellData.image.full}`),
            cooldown: spellData.cooldown,
            cost: spellData.cost
          };

          spells.push(spell);
        }

        const passive: Passive = {
          name: championData.passive.name,
          image: this.lolResourcesService.getDDragonImageUrl(
            `img/passive/${championData.passive.image.full}`
          )
        };

        return {
          name: championData.name,
          spells: spells,
          passive: passive,
          image: this.lolResourcesService.getDDragonImageUrl(
            `img/champion/${championData.image.full}`
          ),
          stats: championData.stats
        };
      })
    );
  }
}
