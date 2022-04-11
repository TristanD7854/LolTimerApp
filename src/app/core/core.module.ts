import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchSummonerComponent } from './components/search-summoner/search-summoner.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [SearchSummonerComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  exports: [SearchSummonerComponent, HeaderComponent],
  providers: []
})
export class CoreModule {}
