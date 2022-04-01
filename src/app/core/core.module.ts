import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchSummonerComponent } from './components/search-summoner/search-summoner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SearchSummonerComponent
    ],
    imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
    exports: [SearchSummonerComponent],
    providers: [
    ],

})
export class CoreModule
{
}