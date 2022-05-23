import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { RunesService } from '../../services/lol-resources/runes/runes.service';

import { ParticipantRunesComponent } from './participant-runes.component';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/mockCurrentGameParticipant.json';

describe('ParticipantRunesComponent', () => {
  let component: ParticipantRunesComponent;
  let fixture: ComponentFixture<ParticipantRunesComponent>;
  let runesService: RunesService;

  const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRunesComponent],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: RunesService,
          useValue: {
            isReady$: of(true),
            getRunes: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRunesComponent);
    component = fixture.componentInstance;
    runesService = TestBed.inject(RunesService);

    component.currentGameParticipant = currentGameParticipant;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RunesService getRunes when it is ready', () => {
    expect(runesService.getRunes).toHaveBeenCalledWith(currentGameParticipant);
  });
});
