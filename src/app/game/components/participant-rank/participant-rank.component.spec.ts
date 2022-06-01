import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRankComponent } from './participant-rank.component';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';

describe('ParticipantRankComponent', () => {
  let component: ParticipantRankComponent;
  let fixture: ComponentFixture<ParticipantRankComponent>;
  const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRankComponent],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRankComponent);
    component = fixture.componentInstance;

    component.currentGameParticipant = currentGameParticipant;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
