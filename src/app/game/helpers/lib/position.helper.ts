import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';

export function getPositionFullName(position: string): Position | null {
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

export function getPosition(index: number): Position {
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

export function getIndex(position: Position): number {
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

export function getAllPositions(): Position[] {
  const positions: Position[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  return positions;
}

export function swapPositions(team: Team, index1: number, index2: number): void {
  [team.members[index1], team.members[index2]] = [team.members[index2], team.members[index1]];
}
