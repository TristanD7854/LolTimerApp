import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';

import { GameInfoComponent } from './game-info.component';
import { MinuteSecondPipe } from '../../pipes/minute-second.pipe';
import { GameLengthService } from '../../services/game-length/game-length.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GameInfoComponent', () => {
  let component: GameInfoComponent;
  let fixture: ComponentFixture<GameInfoComponent>;
  let gameLengthService: GameLengthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameInfoComponent, MockPipe(MinuteSecondPipe)],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: GameLengthService,
          useValue: {
            start: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoComponent);
    component = fixture.componentInstance;
    gameLengthService = TestBed.inject(GameLengthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call gameLengthService start', () => {
    expect(gameLengthService.start).toHaveBeenCalledWith();
  });
});
