import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChampionsService } from './champions.service';

describe('ChampionsService', () => {
  let service: ChampionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ChampionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
