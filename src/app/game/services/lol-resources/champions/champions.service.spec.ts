import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LolResourcesService } from '../lol-resources.service';

import { ChampionsService } from './champions.service';

import championsMockData from 'src/app/game/services/lol-resources/champions/champions.json';
import championMockData from 'src/app/game/services/lol-resources/champions/champion.json';
import championMappedMockData from 'src/app/game/services/lol-resources/champions/championMapped.json';

import { Champion } from 'src/app/game/models/champion.model';

describe('ChampionsService', () => {
  let service: ChampionsService;
  let lolResourcesService: LolResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: LolResourcesService,
          useValue: {
            callDDragonCdnData: (specificRessource: string) => {
              if (specificRessource == 'champion.json') return of(championsMockData);
              return of(championMockData);
            },
            getDDragonImageUrl: () => 'imageUrl'
          }
        }
      ]
    });
  });

  beforeEach(() => {
    lolResourcesService = TestBed.inject(LolResourcesService);
    service = TestBed.inject(ChampionsService);
    //service = new ChampionsService(lolResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call callDDragonCdnData', () => {
      const lolResourcesServiceSpy = jest.spyOn(lolResourcesService, 'callDDragonCdnData');

      service.initialize();

      expect(lolResourcesServiceSpy).toHaveBeenCalledWith('champion.json');
    });
  });

  describe('getChampionName', () => {
    beforeEach(() => {
      service.initialize();
    });

    it('should return the champion name if exist', () => {
      expect(service.getChampionName(103)).toEqual('Ahri');
    });

    it('should return "Champion not found" if doesnt exist', () => {
      expect(service.getChampionName(999)).toEqual('Champion not found');
    });
  });

  describe('getChampion', () => {
    beforeEach(() => {
      service.initialize();
    });

    it('should return the champion object if it exists', (done) => {
      service.getChampion('Jinx').subscribe((champion: Champion) => {
        expect(champion).toStrictEqual(championMappedMockData);
        done();
      });
    });
  });
});
