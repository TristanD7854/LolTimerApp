export interface Champion {
  name: string;
  spells: Spell[];
  passive: Passive;
  image: string;
  stats: ChampionStats;
}

export interface Spell {
  name: string;
  image: string;
  cooldown: number[];
  cost: number[];
  //damage?: Damage;
}

export interface Passive {
  name: string;
  image: string;
}

export interface Damage {
  flatDamage: number[];
  adRatio: number;
  apRatio: number;
  healthRatio: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}
