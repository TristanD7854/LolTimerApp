import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveService } from '../../services/save/save.service';

import { ChampionListComponent } from './champion-list.component';

describe('ChampionListComponent', () => {
  let component: ChampionListComponent;
  let fixture: ComponentFixture<ChampionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChampionListComponent],
      providers: [
        {
          provide: SaveService,
          useValue: {
            getCurrentGameInfo: () => jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
