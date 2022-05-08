import { SummonerSpell } from '../../models/summoner-spell.model';

export function getSummonerSpellFullName(summonerSpell: string): SummonerSpell | null {
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
