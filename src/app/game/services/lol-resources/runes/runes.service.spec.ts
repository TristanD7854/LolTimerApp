import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LolResourcesService } from '../lol-resources.service';

import mockDDragonRunesReforged from 'src/app/game/services/lol-resources/runes/mockData/mockDDragonRunesReforged.json';
import mockCDragonPerks from 'src/app/game/services/lol-resources/runes/mockData/mockCDragonPerks.json';

import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';
import mockCurrentGameParticipant2 from 'src/app/game/models/riot-api/mockCurrentGameParticipant2.json';
import mockRunesModel from 'src/app/game/models/runes/mockRunesModel.json';

import { RunesService } from './runes.service';

describe('RunesService', () => {
  let service: RunesService;
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
            callDDragonCdnData: () => of(mockDDragonRunesReforged),
            callCDragonCdn: () => of(mockCDragonPerks),
            getCDragonImageUrl: (specificRessource: string) =>
              'CDragonImageUrl-' + specificRessource,
            getDDragonCanisbackImageUrl: (specificRessource: string) =>
              'DDragonCanisbackImageUr-' + specificRessource
          }
        }
      ]
    });
    service = TestBed.inject(RunesService);
    lolResourcesService = TestBed.inject(LolResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call callDDragonCdnData', () => {
      const lolResourcesServiceSpy = jest.spyOn(lolResourcesService, 'callDDragonCdnData');

      service.initialize();

      expect(lolResourcesServiceSpy).toHaveBeenCalledWith('runesReforged.json');
    });

    it('should call callCDragonCdn', () => {
      const lolResourcesServiceSpy = jest.spyOn(lolResourcesService, 'callCDragonCdn');

      service.initialize();

      expect(lolResourcesServiceSpy).toHaveBeenCalledWith('perks.json');
    });

    it('should be ready', (done) => {
      service.isReady$.subscribe((value: boolean) => {
        expect(value).toEqual(true);
        done();
      });

      service.initialize();
    });
  });

  describe('hasCosmicInsight', () => {
    it('should return true if has cosmic insight', () => {
      expect(service.hasCosmicInsight(mockCurrentGameParticipant)).toEqual(true);
    });

    it('should return false if doesnt have cosmic insight', () => {
      expect(service.hasCosmicInsight(mockCurrentGameParticipant2)).toEqual(false);
    });
  });

  describe('getRunes', () => {
    beforeEach(() => {
      service.initialize();
    });

    it('should return the correct runes', () => {
      expect(service.getRunes(mockCurrentGameParticipant)).toEqual(mockRunesModel);
    });
  });
});
