import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionListComponent } from './core/components/champion-list/champion-list.component';
import { SearchSummonerComponent } from './core/components/search-summoner/search-summoner.component';

const routes: Routes = [
  { path: '', component: SearchSummonerComponent },
  { path: 'game', component: ChampionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
