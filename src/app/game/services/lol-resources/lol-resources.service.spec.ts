import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LolResourcesService } from './lol-resources.service';

describe('LolResourcesService', () => {
  let service: LolResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(LolResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
