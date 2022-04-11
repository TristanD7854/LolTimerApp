import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSummonerComponent } from './core/components/search-summoner/search-summoner.component';

const routes: Routes = [
  { path: '', component: SearchSummonerComponent },
  {
    path: 'game',
    loadChildren: () =>
      import('./participant/participant.module').then(
        (m) => m.ParticipantModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
