import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VersionService } from '../version/version.service';
import { Champion, Passive, Spell } from '../../models/champion.model';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  // give champion name, champion stats + champion images

  // http://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/champion/Aatrox.json
  // https://developer.riotgames.com/docs/lol
  // http://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/Aatrox.png

  private allChampionJsonUrl!: string;
  private allChampionInfo: any;

  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private languageService: LanguageService
  ) {}

  public initialize() {
    this.allChampionJsonUrl = `${
      this.versionService.dataDragonUrl
    }/data/${this.languageService.getLocale()}/champion.json`;

    this.getAllChampionsInfo().subscribe((resp) => {
      this.allChampionInfo = resp;
      this.isReady$.next(true);
    });
  }

  public getAllChampionsInfo(): Observable<any> {
    return this.http.get<any>(this.allChampionJsonUrl);
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
    const championJsonUrl = `${
      this.versionService.dataDragonUrl
    }/data/${this.languageService.getLocale()}/champion/${championName}.json`;

    return this.http.get<any>(championJsonUrl).pipe(
      map((response) => {
        const championData = response.data[championName];

        const spells: Spell[] = [];

        for (let index = 0; index < 4; index++) {
          const spellData = championData.spells[index];

          const spell: Spell = {
            name: spellData.name,
            image: `${this.versionService.dataDragonUrl}/img/spell/${spellData.image.full}`,
            cooldown: spellData.cooldown,
            cost: spellData.cost
          };

          spells.push(spell);
        }

        const passive: Passive = {
          name: championData.passive.name,
          image: `${this.versionService.dataDragonUrl}/img/passive/${championData.passive.image.full}`
        };

        return {
          name: championData.name,
          spells: spells,
          passive: passive,
          image: `${this.versionService.dataDragonUrl}/img/champion/${championData.image.full}`,
          stats: championData.stats
        };
      })
    );
  }
}
