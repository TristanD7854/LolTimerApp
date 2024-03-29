import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSecond'
})
export class MinuteSecondPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}
