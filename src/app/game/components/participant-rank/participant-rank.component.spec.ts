import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRankComponent } from './participant-rank.component';

describe('ParticipantRankComponent', () => {
  let component: ParticipantRankComponent;
  let fixture: ComponentFixture<ParticipantRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRankComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
