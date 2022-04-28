import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorApiService } from './spectator-api.service';

describe('SpectatoApiService', () => {
  let service: SpectatorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(SpectatorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
