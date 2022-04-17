import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSummonerComponent } from './core/components/search-summoner/search-summoner.component';

const routes: Routes = [
  { path: '', component: SearchSummonerComponent },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
