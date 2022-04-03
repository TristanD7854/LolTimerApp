import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { ChampionsService } from '../../services/champions/champions.service';

import { ChampionComponent } from './champion.component';

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let fixture: ComponentFixture<ChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChampionComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ChampionsService,
          useValue: {
            getChampionName: () => 'Aatrox'
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionComponent);
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

  it('should set the correct champion name', () => {
    expect(component.championName).toEqual('Aatrox');
  });
});
