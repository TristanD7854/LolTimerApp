import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';

import { GameInfoComponent } from './game-info.component';
import { MinuteSecondPipe } from '../../pipes/minute-second.pipe';

describe('GameInfoComponent', () => {
  let component: GameInfoComponent;
  let fixture: ComponentFixture<GameInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameInfoComponent, MockPipe(MinuteSecondPipe)]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
