import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSummonerComponent } from './search-summoner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SpectatorApiService } from 'src/app/game/services/riot-api/spectator-api/spectator-api.service';
import deferlisGame from 'src/app/game/services/riot-api/spectator-api/mockData/deferlisGame.json';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SaveService } from '../../../game/services/save/save.service';
import { CustomErrorMessage } from 'src/app/game/models/errors/errors';
import { ErrorMessages } from '../../../game/models/errors/errors';

describe('SearchSummonerComponent', () => {
  let component: SearchSummonerComponent;
  let fixture: ComponentFixture<SearchSummonerComponent>;
  let spectatorApiService: SpectatorApiService;
  let saveService: SaveService;
  let router: Router;
  const summonerName = 'Deferlis';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [SearchSummonerComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn()
          }
        },
        {
          provide: SaveService,
          useValue: {
            setCurrentGameInfo: jest.fn(),
            setMainParticipant: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSummonerComponent);
    component = fixture.componentInstance;
    spectatorApiService = TestBed.inject(SpectatorApiService);
    saveService = TestBed.inject(SaveService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on submit', () => {
    beforeEach(() => {
      component.summonerName = summonerName;
    });

    describe('if summoner found and in game', () => {
      beforeEach(() => {
        spectatorApiService.getCurrentGameInfoWithSummonerName = jest
          .fn()
          .mockReturnValue(of(deferlisGame));
      });

      it('should call setCurrentGameInfo with the currentGameInfo', () => {
        component.onSubmitForm();

        expect(saveService.setCurrentGameInfo).toHaveBeenCalledWith(deferlisGame);
      });

      it('should call setMainParticipant with sommonerName', () => {
        component.onSubmitForm();

        expect(saveService.setMainParticipant).toHaveBeenCalledWith(summonerName);
      });

      it('should navigate to game/summonerName', () => {
        component.onSubmitForm();

        expect(router.navigateByUrl).toHaveBeenCalledWith(`game/${summonerName}`);
      });
    });

    describe('if summoner not found', () => {
      beforeEach(() => {
        spectatorApiService.getCurrentGameInfoWithSummonerName = jest
          .fn()
          .mockReturnValue(of(new CustomErrorMessage(ErrorMessages.summonerNotFound)));
      });

      it('should not call SaveService and navigate', () => {
        component.onSubmitForm();

        expect(saveService.setCurrentGameInfo).not.toHaveBeenCalled();
        expect(saveService.setMainParticipant).not.toHaveBeenCalled();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
      });
    });
  });
});
