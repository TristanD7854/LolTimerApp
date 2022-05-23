import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SummonerSpellComponent } from './summoner-spell.component';
import { Summ } from '../../models/summs/summs.model';
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
      cooldown: 300
    };
    component.summ$ = of(mockSumm);
    component.useSummSubject$ = new Subject();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('useSumm', () => {
    it('should set timeLeft accordingly', () => {
      component.useSumm(30);

      expect(component.timeLeft).toEqual(270);
    });

    it('should return if called directly after', () => {
      component.useSumm(30);
      component.useSumm(50);

      expect(component.timeLeft).toEqual(270);
    });

    it('should reduce opacity', () => {
      component.useSumm(30);

      expect(component.summOpacity).toEqual('50%');
    });

    it('should resetTimer when no timeLeft', fakeAsync((): void => {
      component.useSumm(30);

      tick(271001);

      expect(component.summOpacity).toEqual('100%');
      expect(component.timeLeft).toEqual(300);
    }));
  });

  describe('addTime', () => {
    it('should add time', () => {
      component.useSumm(30);

      component.addTime(20);

      expect(component.timeLeft).toEqual(290);
    });

    it('should remove time', () => {
      component.useSumm(30);

      component.addTime(-20);

      expect(component.timeLeft).toEqual(250);
    });
  });
});
