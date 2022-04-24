import { Injectable } from '@angular/core';
import { SaveService } from '../save/save.service';
import { ProcessedCommand } from '../../models/command.model';
import { Subject } from 'rxjs';
import { Position } from '../../models/position.model';
import { SummonerSpell } from '../../models/summoner-spell.model';
import { GameLengthService } from '../game-length/game-length.service';
import { getTimeInSeconds } from '../../helpers/time-helper';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor(private saveService: SaveService, private gameLengthService: GameLengthService) {}

  public enemyTeamSummonerSubject: Subject<[Position, SummonerSpell, number]> = new Subject();

  public processCommand(command: string): ProcessedCommand {
    console.log('process command ' + command);
    const processedCommand: ProcessedCommand = {
      command: command
    };

    const commandArr = command.split(' ');

    const position: Position | null = this.getPositionFullName(commandArr[1]);
    const summonerSpell: SummonerSpell | null = this.getSummonerSpellFullName(commandArr[0]);
    const time: number | null = this.getTimeOfUse(commandArr[2]);

    if (position == null || summonerSpell == null || time == null) {
      return {
        error: 'Command not understood',
        command: command
      };
    }

    console.log('Use of ' + summonerSpell + ' by ' + position + ' at ' + time);
    this.enemyTeamSummonerSubject.next([position, summonerSpell, time]);

    return processedCommand; // how to know if correctly processed ? -> check getSummonerSpellFullName and so, for correct casting
  }

  private getSummonerSpellFullName(summonerSpell: string): SummonerSpell | null {
    switch (summonerSpell) {
      case 'barrier':
      case 'b':
        return 'Barrier';

      case 'cleanse':
      case 'c':
        return 'Cleanse';

      case 'exhaust':
      case 'exh':
      case 'e':
        return 'Exhaust';

      case 'flash':
      case 'f':
        return 'Flash';

      case 'ghost':
      case 'gh':
      case 'g':
        return 'Ghost';

      case 'ignite':
      case 'ign':
      case 'i':
        return 'Ignite';

      case 'heal':
      case 'h':
        return 'Heal';

      case 'teleport':
      case 'tp':
      case 't':
        return 'Teleport';
    }
    return null;
  }

  private getPositionFullName(position: string): Position | null {
    switch (position) {
      case 'top':
      case 't':
        return 'TOP';

      case 'jungle':
      case 'jng':
      case 'j':
        return 'JUNGLE';

      case 'middlane':
      case 'mid':
      case 'm':
        return 'MID';

      case 'adc':
      case 'a':
        return 'ADC';

      case 'support':
      case 'sup':
      case 's':
        return 'SUPPORT';
    }

    return null;
  }

  private getTimeOfUse(time: string): number | null {
    /*
    todo : ign j 11, ign j 11.35, ign j -20(s), ign j 11s, ign t 1225, f a 855
    si on ajoute s c'est un delay, sinon un temps
    */

    const timeOrDelay = +time.slice(0, -1);
    const isDelay: boolean = time.slice(-1) == 's';

    if (isDelay) {
      // exple : ign j 20s
      return timeOrDelay;
    } else {
      let timeArr: string[];

      if (time.includes('.')) {
        // f t 12.25, f t 12.00
        timeArr = time.split('.');
      } else if (time.includes(',')) {
        // f t 12,2
        timeArr = time.split(',');
      } else {
        if (time.length <= 2) {
          //  f t 12
          timeArr = [time, '0'];
        } else {
          // f t 1225, or f t 825
          timeArr = [time.slice(0, -2), time.slice(-2)];
        }
      }

      const timeInSecondsOfUse = getTimeInSeconds(timeArr);
      if (isNaN(timeInSecondsOfUse)) {
        return null;
      }
      return this.gameLengthService.gameLength - timeInSecondsOfUse;
    }
  }
}
