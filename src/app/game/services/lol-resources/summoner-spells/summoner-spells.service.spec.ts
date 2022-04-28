import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SummonerSpellsService } from './summoner-spells.service';

describe('SummonerSpellsService', () => {
  let service: SummonerSpellsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(SummonerSpellsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
