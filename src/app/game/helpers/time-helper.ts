export function getTimeInSeconds(timeArr: string[]): number {
  return +timeArr[0] * 60 + +timeArr[1];
}
