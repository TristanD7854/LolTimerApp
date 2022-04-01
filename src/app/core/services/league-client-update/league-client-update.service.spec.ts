import { TestBed } from '@angular/core/testing';

import { LeagueClientUpdateService } from './league-client-update.service';

describe('LeagueClientUpdateService', () => {
  let service: LeagueClientUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueClientUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
