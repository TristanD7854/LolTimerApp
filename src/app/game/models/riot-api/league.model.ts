export interface RankInformation {
  leagueId: string;
  queueType: GameType;
  tier: Tier;
  rank: Rank;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export type GameType = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR';
export type Tier =
  | 'Iron'
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond'
  | 'Master'
  | 'Grandmaster'
  | 'Challenger';
export type Rank = 'IV' | 'III' | 'II' | 'I';
