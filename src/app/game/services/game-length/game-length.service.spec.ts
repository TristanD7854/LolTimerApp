import { TestBed } from '@angular/core/testing';

import { GameLengthService } from './game-length.service';

describe('GameLengthService', () => {
  let service: GameLengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
