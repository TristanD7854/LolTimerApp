import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RankApiService } from './rank-api.service';

describe('RankService', () => {
  let service: RankApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RankApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
