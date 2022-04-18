import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestWith, Observable } from 'rxjs';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Rune, Runes } from '../../models/runes.model';
import { LanguageService } from '../language/language.service';
import { VersionService } from '../version/version.service';

@Injectable({
  providedIn: 'root'
})
export class RunesService {
  /*
  http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/runesReforged.json
  perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png
  -> https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png

    shard runes slots :
  https://github.com/RiotGames/developer-relations/issues/26
  https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perks.json
  https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png
  */

  private runesDDragonJsonUrl!: string;
  private runesCDragonJsonUrl!: string;
  private runesDDragonInfo: any;
  private runesCDragonInfo: any;
  private cosmicInsightId = 8347; //todolongafter : don't stock that, just search through the rune for "Summoner Spell Haste"

  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private languageService: LanguageService
  ) {}

  public initialize() {
    this.runesDDragonJsonUrl = `${
      this.versionService.dataDragonUrl
    }/data/${this.languageService.getLocale()}/runesReforged.json`;
    this.runesCDragonJsonUrl = `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perks.json`;

    const runesDDragon$ = this.getrunesDDragonInfo();
    const runesCDragon$ = this.getrunesCDragonInfo();

    runesDDragon$
      .pipe(combineLatestWith(runesCDragon$))
      .subscribe(([runesDDragon, runesCDragon]) => {
        if (runesDDragon && runesCDragon) {
          this.runesDDragonInfo = runesDDragon;
          this.runesCDragonInfo = runesCDragon;
          this.isReady.next(true);
        }
      });
  }

  public getrunesDDragonInfo(): Observable<any> {
    return this.http.get<any>(this.runesDDragonJsonUrl);
  }

  public getrunesCDragonInfo(): Observable<any> {
    return this.http.get<any>(this.runesCDragonJsonUrl);
  }

  public hasCosmicInsight(participant: CurrentGameParticipant): boolean {
    return participant.perks.perkIds.includes(this.cosmicInsightId);
  }

  private addRuneToPathDDragon(pathToAddRune: Rune[], perkId: number): void {
    for (const path of this.runesDDragonInfo) {
      for (const runes of path.slots) {
        for (const rune of runes.runes) {
          if (rune.id == perkId) {
            pathToAddRune.push({
              name: rune.name,
              image: 'https://ddragon.canisback.com/img/' + rune.icon
            });
            return;
          }
        }
      }
    }
  }

  private addRuneToPathCDragon(statRunes: Rune[], perkId: number): void {
    for (const rune of this.runesCDragonInfo) {
      if (rune.id == perkId) {
        statRunes.push({
          name: rune.name,
          image:
            'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/' +
            rune.iconPath.match(/\w+\.png/g)[0].toLowerCase()
        });
        return;
      }
    }
  }

  public getRunes(participant: CurrentGameParticipant): Runes {
    const primaryPath: Rune[] = [];
    const secondaryPath: Rune[] = [];
    const statRunes: Rune[] = [];

    //for (const summonerSpell in this.runesDDragonInfo.data)

    let runePosition = 1;
    for (const perkId of participant.perks.perkIds) {
      if (runePosition <= 4) {
        this.addRuneToPathDDragon(primaryPath, perkId);
      } else if (runePosition == 5 || runePosition == 6) {
        this.addRuneToPathDDragon(secondaryPath, perkId);
      } else {
        this.addRuneToPathCDragon(statRunes, perkId);
      }
      runePosition++;
    }

    return {
      primaryPath: primaryPath,
      secondaryPath: secondaryPath,
      statRunes: statRunes
    };
  }
}
