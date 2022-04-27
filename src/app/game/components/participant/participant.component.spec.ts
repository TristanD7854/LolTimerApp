import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';
import { ChampionsService } from '../../services/champions/champions.service';

import { ParticipantComponent } from './participant.component';
import { MockComponent } from 'ng-mocks';
import { ParticipantRunesComponent } from '../participant-runes/participant-runes.component';
import { ParticipantSummsComponent } from '../participant-summs/participant-summs.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ParticipantComponent', () => {
  let component: ParticipantComponent;
  let fixture: ComponentFixture<ParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ParticipantComponent,
        MockComponent(ParticipantRunesComponent),
        MockComponent(ParticipantSummsComponent)
      ],
      imports: [FormsModule, MatTooltipModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ChampionsService,
          useValue: {
            getChampionName: () => 'Aatrox',
            isReady$: of(true)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantComponent);
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

    // todo : isAllyTeam false, enemyTeamSwapSubject calls, ... Bref, tester pour de vrai
    const team: Team = {
      members: [mockCurrentGameParticipant],
      isAllyTeam: true
    };

    component.currentGameParticipant = mockCurrentGameParticipant;
    component.team = team;
    component.positionIndex = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
