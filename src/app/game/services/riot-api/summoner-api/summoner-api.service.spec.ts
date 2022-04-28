import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SummonerApiService } from './summoner-api.service';

describe('SummonerApiService', () => {
  let service: SummonerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(SummonerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
