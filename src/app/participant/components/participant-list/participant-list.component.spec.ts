import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveService } from 'src/app/core/services/save/save.service';

import { ParticipantListComponent } from './participant-list.component';

describe('ParticipantListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantListComponent],
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
    fixture = TestBed.createComponent(ParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
