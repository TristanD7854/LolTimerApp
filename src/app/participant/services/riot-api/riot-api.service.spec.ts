import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RiotApiService } from './riot-api.service';

describe('RiotApiService', () => {
  let service: RiotApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RiotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
