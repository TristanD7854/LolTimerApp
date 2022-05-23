export interface Summs {
  summ1: Summ;
  summ2: Summ;
}

export interface Summ {
  name: string;
  image: string;
  cooldown: number;
}

export type SummonerSpell =
  | 'Barrier'
  | 'Cleanse'
  | 'Exhaust'
  | 'Flash'
  | 'Ghost'
  | 'Ignite'
  | 'Heal'
  | 'Smite'
  | 'Teleport';
