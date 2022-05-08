import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ParticipantSummsComponent } from './participant-summs.component';
import { MockComponent } from 'ng-mocks';
import { SummonerSpellComponent } from '../summoner-spell/summoner-spell.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { SummonerSpellsService } from '../../services/lol-resources/summoner-spells/summoner-spells.service';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import mockCurrentGameParticipant from 'src/app/game/models/riot-api/currentGameParticipant.json';
import mockSumms from 'src/app/game/models/summs.json';

describe('ParticipantSummsComponent', () => {
  let component: ParticipantSummsComponent;
  let fixture: ComponentFixture<ParticipantSummsComponent>;
  let summonerSpellsService: SummonerSpellsService;

  const currentGameParticipant: CurrentGameParticipant = mockCurrentGameParticipant;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantSummsComponent, MockComponent(SummonerSpellComponent)],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: SummonerSpellsService,
          useValue: {
            isReady$: new BehaviorSubject<boolean>(false),
            getSumms: () => mockSumms
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSummsComponent);
    component = fixture.componentInstance;
    summonerSpellsService = TestBed.inject(SummonerSpellsService);

    component.currentGameParticipant = currentGameParticipant;
    component.useSummsSubject$ = new Subject();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when it is ready', () => {
    it('should call RunesService', () => {
      const summonerSpellsServiceSpy = jest.spyOn(summonerSpellsService, 'getSumms');

      summonerSpellsService.isReady$.next(true);

      expect(summonerSpellsServiceSpy).toHaveBeenCalledWith(currentGameParticipant);
    });

    it('should emit events for summ1', (done) => {
      component.summ1$.subscribe((summ) => {
        expect(summ).toBe(mockSumms.summ1);
        done();
      });

      summonerSpellsService.isReady$.next(true);
    });

    it('should emit events for summ2', (done) => {
      component.summ2$.subscribe((summ) => {
        expect(summ).toBe(mockSumms.summ2);
        done();
      });

      summonerSpellsService.isReady$.next(true);
    });

    describe('and useSummsSubject emits', () => {
      beforeEach(() => {
        summonerSpellsService.isReady$.next(true);
      });

      it('should emit the correct event for summ1', (done) => {
        component.useSumm1Subject$.subscribe((nb) => {
          expect(nb).toBe(10);
          done();
        });

        component.useSummsSubject$.next(['Exhaust', 10]);
      });

      it('should emit the correct event for summ2', (done) => {
        component.useSumm2Subject$.subscribe((nb) => {
          expect(nb).toBe(10);
          done();
        });

        component.useSummsSubject$.next(['Flash', 10]);
      });
    });
  });
});
