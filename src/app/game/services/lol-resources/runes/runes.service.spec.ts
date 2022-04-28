import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RunesService } from './runes.service';

describe('RunesService', () => {
  let service: RunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
