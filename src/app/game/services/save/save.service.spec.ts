import { TestBed } from '@angular/core/testing';

import { SaveService } from './save.service';

import deferlisGame from 'src/app/game/services/riot-api/spectator-api/mockData/deferlisGame.json';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';

describe('SaveService', () => {
  let service: SaveService;
  const currentGameInfo: CurrentGameInfo = deferlisGame;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentGameInfo', () => {
    it('should set the currentGameInfo', () => {
      service.setCurrentGameInfo(currentGameInfo);

      expect(service.getCurrentGameInfo()).toEqual(currentGameInfo);
    });

    it('should set hasSavedCurrentGameInfoSubject to true', (done) => {
      service.hasSavedCurrentGameInfoSubject$.subscribe((res) => {
        expect(res).toEqual(true);
        done();
      });

      service.setCurrentGameInfo(currentGameInfo);
    });
  });
});
