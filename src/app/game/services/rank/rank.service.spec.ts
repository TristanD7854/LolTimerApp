import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RankService } from './rank.service';

describe('RankService', () => {
  let service: RankService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    service = TestBed.inject(RankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
