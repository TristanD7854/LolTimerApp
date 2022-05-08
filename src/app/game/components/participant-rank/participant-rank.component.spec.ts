import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRankComponent } from './participant-rank.component';
import { of } from 'rxjs';
import { RankApiService } from '../../services/riot-api/rank-api/rank-api.service';
import deferlisRank from 'src/app/game/services/riot-api/rank-api/mockData/deferlisRank.json';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/currentGameParticipant.json';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';

import * as rankHelper from 'src/app/game/helpers';
import { CustomErrorMessage } from '../../models/errors/errors';

describe('ParticipantRankComponent', () => {
  let component: ParticipantRankComponent;
  let fixture: ComponentFixture<ParticipantRankComponent>;
  let rankApiService: RankApiService;
  const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;
  const tierFirstLetter = 'D';
  const rankNumber = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRankComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: RankApiService,
          useValue: {
            getRankInformationWithSummonerName: () => of(deferlisRank)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRankComponent);
    component = fixture.componentInstance;
    rankApiService = TestBed.inject(RankApiService);

    component.currentGameParticipant = currentGameParticipant;

    jest.spyOn(rankHelper, 'getRankInNumber').mockReturnValue(rankNumber);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RankApiService getRankInformationWithSummonerName', () => {
    jest.spyOn(rankApiService, 'getRankInformationWithSummonerName');

    fixture.detectChanges();

    expect(rankApiService.getRankInformationWithSummonerName).toHaveBeenCalledWith(
      currentGameParticipant.summonerName
    );
  });

  describe('if no error', () => {
    it('should call set the correct rank', () => {
      fixture.detectChanges();

      expect(component.rank).toEqual(tierFirstLetter + rankNumber);
    });
  });

  describe('if there is an error', () => {
    beforeEach(() => {
      jest
        .spyOn(rankApiService, 'getRankInformationWithSummonerName')
        .mockReturnValue(of(new CustomErrorMessage('error')));
    });
    it('should not set the rank', () => {
      fixture.detectChanges();

      expect(component.rank).toBeUndefined();
    });
  });
});
