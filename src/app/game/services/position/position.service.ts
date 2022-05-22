import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getIndex, getPosition, swapPositions } from '../../helpers';
import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  public allyTeamSwapSubject$: Subject<[Position, Position]> = new Subject();
  public enemyTeamSwapSubject$: Subject<[Position, Position]> = new Subject();

  public swapPositionInTeam(team: Team, oldPositionIndex: number, newPosition: Position): void {
    swapPositions(team, oldPositionIndex, getIndex(newPosition));

    if (team.isAllyTeam) {
      this.allyTeamSwapSubject$.next([getPosition(oldPositionIndex), newPosition]);
    } else {
      this.enemyTeamSwapSubject$.next([getPosition(oldPositionIndex), newPosition]);
    }
  }
}
