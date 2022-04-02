import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchSummonerComponent } from './components/search-summoner/search-summoner.component';
import { FormsModule } from '@angular/forms';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { ChampionComponent } from './components/champion/champion.component';

@NgModule({
    declarations: [
        SearchSummonerComponent,
        ChampionListComponent,
        ChampionComponent,
    ],
    imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
    exports: [SearchSummonerComponent],
    providers: [
    ],

})
export class CoreModule
{
}
