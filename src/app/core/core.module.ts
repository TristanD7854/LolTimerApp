import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchSummonerComponent } from './components/search-summoner/search-summoner.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [SearchSummonerComponent, HeaderComponent, ModalComponent],
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  exports: [SearchSummonerComponent, HeaderComponent, ModalComponent],
  providers: []
})
export class CoreModule {}
