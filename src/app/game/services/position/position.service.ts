import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';
import { SaveService } from '../save/save.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private saveService: SaveService) {}

  public allyTeamSwapSubject: Subject<[Position, Position]> = new Subject();
  public enemyTeamSwapSubject: Subject<[Position, Position]> = new Subject();

  public getPosition(index: number): Position {
    switch (index) {
      case 0:
        return 'TOP';
      case 1:
        return 'JUNGLE';
      case 2:
        return 'MID';
      case 3:
        return 'ADC';
      case 4:
        return 'SUPPORT';
    }
    return 'none';
  }

  public getIndex(position: Position): number {
    switch (position) {
      case 'TOP':
        return 0;
      case 'JUNGLE':
        return 1;
      case 'MID':
        return 2;
      case 'ADC':
        return 3;
      case 'SUPPORT':
        return 4;
    }
    return -1;
  }

  public getAllPositions(): Position[] {
    const positions: Position[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
    return positions;
  }

  public swapPositionInTeam(team: Team, oldPositionIndex: number, newPosition: Position): void {
    this.swapPositions(team, oldPositionIndex, this.getIndex(newPosition));

    if (team.isAllyTeam) {
      this.allyTeamSwapSubject.next([this.getPosition(oldPositionIndex), newPosition]);
    } else {
      this.enemyTeamSwapSubject.next([this.getPosition(oldPositionIndex), newPosition]);
    }
  }

  public swapPositions(team: Team, index1: number, index2: number): void {
    [team.members[index1], team.members[index2]] = [team.members[index2], team.members[index1]];
  }
}
