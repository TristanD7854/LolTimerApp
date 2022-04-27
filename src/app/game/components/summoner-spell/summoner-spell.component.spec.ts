import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerSpellComponent } from './summoner-spell.component';
import { Summ } from '../../models/summs.model';
import { of, Subject } from 'rxjs';

describe('SummonerSpellComponent', () => {
  let component: SummonerSpellComponent;
  let fixture: ComponentFixture<SummonerSpellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummonerSpellComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonerSpellComponent);
    component = fixture.componentInstance;

    const mockSumm: Summ = {
      name: '',
      image: '',
      cooldown: 0
    };
    component.summ$ = of(mockSumm);
    component.useSummSubject = new Subject();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
