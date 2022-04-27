import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from '../settings/settings.component';
import { MockComponent } from 'ng-mocks';
import { GameComponent } from './game.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ParticipantListComponent } from '../participant-list/participant-list.component';
import { CommandLineComponent } from '../command-line/command-line.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        MockComponent(SettingsComponent),
        MockComponent(GameInfoComponent),
        MockComponent(ParticipantListComponent),
        MockComponent(CommandLineComponent)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
