import { MinuteSecondPipe } from './minute-second.pipe';

describe('MinuteSecondPipe', () => {
  const pipe = new MinuteSecondPipe();

  it('create an instance', () => {
    const pipe = new MinuteSecondPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform(200)).toBe('3:20');
  });
});
