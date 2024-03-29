import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SummonerSpellsService } from './summoner-spells.service';

import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';
import mockSummsModel from 'src/app/game/models/summs/mockSummsModel.json';
import mockSummsModel_Aram from 'src/app/game/models/summs/mockSummsModel_Aram.json';
import mockSummsModel_WithoutCosmicInsight from 'src/app/game/models/summs/mockSummsModel_WithoutCosmicInsight.json';
import mockDDragonSummoner from 'src/app/game/services/lol-resources/summoner-spells/mockDDragonSummoner.json';
import { LolResourcesService } from '../lol-resources.service';
import { of } from 'rxjs';
import { SaveService } from '../../save/save.service';
import { RunesService } from '../runes/runes.service';

describe('SummonerSpellsService', () => {
  let service: SummonerSpellsService;
  let lolResourcesService: LolResourcesService;
  let saveService: SaveService;
  let runesService: RunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: LolResourcesService,
          useValue: {
            callDDragonCdnDataEn: () => of(mockDDragonSummoner),
            getDDragonImageUrl: (specificRessource: string) =>
              'DDragonImageUrl-' + specificRessource
          }
        },
        {
          provide: RunesService,
          useValue: {
            hasCosmicInsight: () => true
          }
        },
        {
          provide: SaveService,
          useValue: {
            getCurrentGameInfo: () => ''
          }
        }
      ]
    });
    service = TestBed.inject(SummonerSpellsService);
    lolResourcesService = TestBed.inject(LolResourcesService);
    saveService = TestBed.inject(SaveService);
    runesService = TestBed.inject(RunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call callDDragonCdnData', () => {
      const lolResourcesServiceSpy = jest.spyOn(lolResourcesService, 'callDDragonCdnDataEn');

      service.initialize();

      expect(lolResourcesServiceSpy).toHaveBeenCalledWith('summoner.json');
    });

    it('should be ready', (done) => {
      service.isReady$.subscribe((value: boolean) => {
        expect(value).toEqual(true);
        done();
      });

      service.initialize();
    });
  });

  describe('getSumms', () => {
    beforeEach(() => {
      service.initialize();
    });

    describe('with cosmic insight', () => {
      it('should return the correct summs if not aram', () => {
        expect(service.getSumms(mockCurrentGameParticipant)).toEqual(mockSummsModel);
      });

      it('should return the correct summs if aram', () => {
        saveService.getCurrentGameInfo = jest.fn().mockReturnValue({ gameMode: 'ARAM' });

        service.initialize();

        expect(service.getSumms(mockCurrentGameParticipant)).toEqual(mockSummsModel_Aram);
      });
    });

    describe('without cosmic insight', () => {
      beforeEach(() => {
        runesService.hasCosmicInsight = jest.fn().mockReturnValue(false);
      });
      it('should return the correct summs', () => {
        expect(service.getSumms(mockCurrentGameParticipant)).toEqual(
          mockSummsModel_WithoutCosmicInsight
        );
      });
    });
  });
});
