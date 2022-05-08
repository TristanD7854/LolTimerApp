export function getTimeInSeconds(timeArr: string[]): number {
  return +timeArr[0] * 60 + +timeArr[1];
}

export function getTimeOfUse(currentTime: number, time: string): number | null {
  const timeOrDelay = +time.slice(0, -1);
  const isDelay: boolean = time.slice(-1) == 's';

  if (time.includes('-')) {
    return null;
  }

  if (isDelay) {
    // exple : ign j 20s
    return timeOrDelay;
  } else {
    let timeArr: string[];

    if (time.includes('.')) {
      // f t 12.25, f t 12.00
      timeArr = time.split('.');
    } else if (time.includes(',')) {
      // f t 12,2
      timeArr = time.split(',');
    } else {
      if (time.length <= 2) {
        //  f t 12
        timeArr = [time, '0'];
      } else {
        // f t 1225, or f t 825
        timeArr = [time.slice(0, -2), time.slice(-2)];
      }
    }

    const timeInSecondsOfUse = getTimeInSeconds(timeArr);
    if (isNaN(timeInSecondsOfUse)) {
      return null;
    }
    const result: number = currentTime - timeInSecondsOfUse;
    return result > 0 ? result : null;
  }
}
