import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRankComponent } from './participant-rank.component';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { of } from 'rxjs';
import { RankApiService } from '../../services/riot-api/rank-api/rank-api.service';

describe('ParticipantRankComponent', () => {
  let component: ParticipantRankComponent;
  let fixture: ComponentFixture<ParticipantRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRankComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: RankApiService,
          useValue: {
            getRankInformation: () => of(true)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRankComponent);
    component = fixture.componentInstance;

    // todo : create json for that
    const mockCurrentGameParticipant: CurrentGameParticipant = {
      teamId: 100,
      spell1Id: 4,
      spell2Id: 12,
      championId: 161,
      profileIconId: 4075,
      summonerName: 'Kreatonn',
      bot: false,
      summonerId: 'L1l1eR8qjO-MRqB0BWl4Lh568b17jRVGS96gB4gwprc-WR4',
      gameCustomizationObjects: [],
      perks: {
        perkIds: [8229, 8224, 8210, 8237, 8345, 8347, 5008, 5008, 5003],
        perkStyle: 8200,
        perkSubStyle: 8300
      }
    };
    component.currentGameParticipant = mockCurrentGameParticipant;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
