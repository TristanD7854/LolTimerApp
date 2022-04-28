import { Rank } from '../models/riot-api/league.model';

export function getRankInNumber(rank: Rank): number {
  switch (rank) {
    case 'I':
      return 1;
    case 'II':
      return 2;
    case 'III':
      return 3;
    case 'IV':
      return 4;
  }
}
