//300*(1-(1 - 1/(1+18/100))) = 254.237

export function giveCooldown(baseCooldown: number, haste: number): number {
  return Math.round(baseCooldown * (1 - (1 - 1 / (1 + haste / 100))));
}
