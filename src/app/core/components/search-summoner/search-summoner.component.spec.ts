import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSummonerComponent } from './search-summoner.component';

describe('SearchSummonerComponent', () => {
  let component: SearchSummonerComponent;
  let fixture: ComponentFixture<SearchSummonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSummonerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
