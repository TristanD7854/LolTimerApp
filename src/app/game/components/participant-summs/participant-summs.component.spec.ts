import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ParticipantSummsComponent } from './participant-summs.component';

describe('ParticipantSummsComponent', () => {
  let component: ParticipantSummsComponent;
  let fixture: ComponentFixture<ParticipantSummsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantSummsComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSummsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
