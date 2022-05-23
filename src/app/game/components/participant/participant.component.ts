import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../../models/champion/champion.model';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { SettingsService } from '../../services/settings/settings.service';
import { SaveService } from '../../services/save/save.service';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position/position.service';
import { Team } from '../../models/team.model';
import { CommandService } from '../../services/command/command.service';
import { SummonerSpell } from '../../models/summs/summs.model';
import { Subject } from 'rxjs';
import { ChampionsService } from '../../services/lol-resources/champions/champions.service';
import { getAllPositions, getIndex, getPosition } from '../../helpers';

@Component({
  selector: 'participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  // ask champions-service + items-service + lcu-service to get total max hp of every champion, lifesteal, mr, armor ...
  // display items
  // another component will display if no anti heal vs lots of healing champs/items

  public isMainParticipant = false;

  public useSummsSubject$: Subject<[SummonerSpell, number]> = new Subject();

  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  @Input()
  public team!: Team;

  @Input()
  public positionIndex!: number;

  public position!: Position;

  public allPositions!: Position[];
  public champion!: Champion;

  constructor(
    private championsService: ChampionsService,
    public settingsService: SettingsService,
    public positionService: PositionService,
    public commandService: CommandService,
    private saveService: SaveService
  ) {}

  public ngOnInit(): void {
    this.championsService.isReady$.subscribe((res) => {
      if (res) this.loadInfo();
    });

    if (this.team.isAllyTeam) {
      this.positionService.allyTeamSwapSubject$.subscribe(([position1, position2]) => {
        this.manageTeamSwapSubject(position1, position2);
      });
    } else {
      this.positionService.enemyTeamSwapSubject$.subscribe(([position1, position2]) => {
        this.manageTeamSwapSubject(position1, position2);
      });

      this.commandService.enemyTeamSummonerSubject$.subscribe(([position, summonerSpell, time]) => {
        if (this.position == position) {
          this.useSummonerSpell(summonerSpell, time);
        }
      });
    }
  }

  private manageTeamSwapSubject(position1: Position, position2: Position): void {
    if (this.position == position1 || this.position == position2) {
      if (this.positionIndex == getIndex(this.position)) {
        this.changePosition(this.position == position1 ? position2 : position1);
      } else {
        this.findPositionIndex();
      }
    }
  }

  private loadInfo(): void {
    this.allPositions = getAllPositions();

    const championName = this.championsService.getChampionName(
      this.currentGameParticipant.championId
    );

    this.isMainParticipant =
      this.saveService.mainParticipantName == this.currentGameParticipant.summonerName;

    this.position = getPosition(this.positionIndex);

    this.championsService.getChampion(championName).subscribe((resp: Champion) => {
      this.champion = resp;
    });
  }

  public selectPosition(): void {
    this.positionService.swapPositionInTeam(this.team, this.positionIndex, this.position);
  }

  private changePosition(newPosition: Position): void {
    this.position = newPosition;
    this.findPositionIndex();
  }

  private findPositionIndex(): void {
    this.positionIndex = getIndex(this.position);
  }

  private useSummonerSpell(summonerSpell: SummonerSpell, time: number): void {
    this.useSummsSubject$.next([summonerSpell, time]);
  }
}
