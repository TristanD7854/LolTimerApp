import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './core/components/header/header.component';
import { VersionService } from './game/services/lol-resources/version/version.service';
import { of } from 'rxjs';
import { SaveService } from './game/services/save/save.service';
import { ChampionsService } from './game/services/lol-resources/champions/champions.service';
import { RunesService } from './game/services/lol-resources/runes/runes.service';
import { SummonerSpellsService } from './game/services/lol-resources/summoner-spells/summoner-spells.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let championsService: ChampionsService;
  let runesService: RunesService;
  let summonerSpellsService: SummonerSpellsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(HeaderComponent)],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: VersionService,
          useValue: {
            initialize: jest.fn(),
            hasRetrievedVersion$: of(true)
          }
        },
        {
          provide: SaveService,
          useValue: {
            hasSavedCurrentGameInfoSubject$: of(true)
          }
        },
        {
          provide: ChampionsService,
          useValue: {
            initialize: jest.fn()
          }
        },
        {
          provide: RunesService,
          useValue: {
            initialize: jest.fn()
          }
        },
        {
          provide: SummonerSpellsService,
          useValue: {
            initialize: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    championsService = TestBed.inject(ChampionsService);
    runesService = TestBed.inject(RunesService);
    summonerSpellsService = TestBed.inject(SummonerSpellsService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the services', () => {
    fixture.detectChanges();

    expect(championsService.initialize).toHaveBeenCalled();
    expect(runesService.initialize).toHaveBeenCalled();
    expect(summonerSpellsService.initialize).toHaveBeenCalled();
  });
});
