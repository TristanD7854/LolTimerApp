import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { Team } from '../../models/team.model';

import { ParticipantComponent } from './participant.component';
import { MockComponent } from 'ng-mocks';
import { ParticipantRunesComponent } from '../participant-runes/participant-runes.component';
import { ParticipantSummsComponent } from '../participant-summs/participant-summs.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChampionsService } from '../../services/lol-resources/champions/champions.service';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';
import { ParticipantRankComponent } from '../participant-rank/participant-rank.component';

describe('ParticipantComponent', () => {
  let component: ParticipantComponent;
  let fixture: ComponentFixture<ParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ParticipantComponent,
        MockComponent(ParticipantRunesComponent),
        MockComponent(ParticipantSummsComponent),
        MockComponent(ParticipantRankComponent)
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

    const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;

    const team: Team = {
      members: [currentGameParticipant],
      isAllyTeam: true
    };

    component.currentGameParticipant = currentGameParticipant;
    component.team = team;
    component.positionIndex = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
