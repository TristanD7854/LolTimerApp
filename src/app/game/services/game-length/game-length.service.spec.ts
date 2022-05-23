import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { SaveService } from '../save/save.service';

import { GameLengthService } from './game-length.service';

import mockSpectator from 'src/app/game/services/riot-api/spectator-api/mockData/mockSpectator.json';

describe('GameLengthService', () => {
  let service: GameLengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SaveService,
          useValue: {
            hasSavedCurrentGameInfoSubject$: of(true),
            getCurrentGameInfo: () => mockSpectator
          }
        }
      ]
    });
    service = TestBed.inject(GameLengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when it starts', () => {
    it('should set the game length', () => {
      service.start();

      expect(service.gameLength).toEqual(130); // 10 + 120
    });

    it('should correctly increment the game length', fakeAsync((): void => {
      service.start();

      tick(8000);

      expect(service.gameLength).toEqual(138);

      discardPeriodicTasks();
    }));
  });
});
