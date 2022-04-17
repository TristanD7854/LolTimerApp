import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VersionService } from '../version/version.service';
import { Champion, Passive, Spell } from '../../models/riot-api/champion.model';

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
  private version!: string;
  private dataDragonUrl!: string;

  constructor(
    private http: HttpClient,
    private versionService: VersionService
  ) {}

  public initialize() {
    this.version = this.versionService.getCurrentVersion();
    this.dataDragonUrl = `http://ddragon.leagueoflegends.com/cdn/${this.version}`;
    this.allChampionJsonUrl = `${this.dataDragonUrl}/data/fr_FR/champion.json`;

    this.getAllChampionsInfo().subscribe((resp) => {
      this.allChampionInfo = resp;
    });
  }

  public getAllChampionsInfo(): Observable<any> {
    return this.http.get<any>(this.allChampionJsonUrl);
  }

  public getChampionName(id: number): string {
    for (const championName in this.allChampionInfo.data) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.allChampionInfo.data,
          championName
        )
      ) {
        if (this.allChampionInfo.data[championName].key == id) {
          return championName;
        }
      }
    }

    return 'Champion not found'; // todo : returns error instead
  }

  public getChampion(championName: string): Observable<Champion> {
    const championJsonUrl = `${this.dataDragonUrl}/data/fr_FR/champion/${championName}.json`;

    return this.http.get<any>(championJsonUrl).pipe(
      map((response) => {
        const championData = response.data[championName];

        const spells: Spell[] = [];

        for (let index = 0; index < 4; index++) {
          const spellData = championData.spells[index];

          const spell: Spell = {
            name: spellData.name,
            image: `${this.dataDragonUrl}/img/spell/${spellData.image.full}`,
            cooldown: spellData.cooldown,
            cost: spellData.cost
          };

          spells.push(spell);
        }

        const passive: Passive = {
          name: championData.passive.name,
          image: `${this.dataDragonUrl}/img/passive/${championData.passive.image.full}`
        };

        return {
          name: championData.name,
          spells: spells,
          passive: passive,
          image: `${this.dataDragonUrl}/img/champion/${championData.image.full}`,
          stats: championData.stats
        };
      })
    );
  }
}
