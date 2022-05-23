import { Injectable } from '@angular/core';
import { ProcessedCommand } from '../../models/command.model';
import { Subject } from 'rxjs';
import { Position } from '../../models/position.model';
import { SummonerSpell } from '../../models/summs/summs.model';
import { GameLengthService } from '../game-length/game-length.service';
import { getPositionFullName, getSummonerSpellFullName, getTimeOfUse } from '../../helpers';

const defaultDelay = 5;

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor(private gameLengthService: GameLengthService) {}

  public enemyTeamSummonerSubject$: Subject<[Position, SummonerSpell, number]> = new Subject();

  public processCommand(command: string): ProcessedCommand {
    const processedCommand: ProcessedCommand = {
      command: command
    };

    const commandArr = command.split(' ');

    const position: Position | null = getPositionFullName(commandArr[1]);
    const summonerSpell: SummonerSpell | null = getSummonerSpellFullName(commandArr[0]);
    const time: number | null = commandArr[2]
      ? getTimeOfUse(this.gameLengthService.gameLength, commandArr[2])
      : defaultDelay;

    if (position == null || summonerSpell == null || time == null) {
      return {
        error: 'Command not understood',
        command: command
      };
    }

    this.enemyTeamSummonerSubject$.next([position, summonerSpell, time]);

    return processedCommand; // how to know if correctly processed ? -> check getSummonerSpellFullName and so, for correct casting
  }
}
