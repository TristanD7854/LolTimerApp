import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SaveService } from '../../services/save/save.service';

import { ParticipantListComponent } from './participant-list.component';
import { MockComponent } from 'ng-mocks';
import { TeamComponent } from '../team/team.component';
import { ModalComponent } from '../../../core/components/modal/modal.component';

describe('ParticipantListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ParticipantListComponent,
        MockComponent(TeamComponent),
        MockComponent(ModalComponent)
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SaveService,
          useValue: {
            getCurrentGameInfo: () => jest.fn()
          }
        },
        HttpClient,
        HttpHandler
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
