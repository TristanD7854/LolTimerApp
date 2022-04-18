import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRunesComponent } from './participant-runes.component';

describe('ParticipantRunesComponent', () => {
  let component: ParticipantRunesComponent;
  let fixture: ComponentFixture<ParticipantRunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantRunesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
