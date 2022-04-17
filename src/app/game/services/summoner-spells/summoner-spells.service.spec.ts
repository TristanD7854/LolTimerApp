import { TestBed } from '@angular/core/testing';

import { SummonerSpellsService } from './summoner-spells.service';

describe('SummonerSpellsService', () => {
  let service: SummonerSpellsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummonerSpellsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
