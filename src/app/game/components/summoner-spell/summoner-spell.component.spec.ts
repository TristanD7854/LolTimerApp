import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerSpellComponent } from './summoner-spell.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
