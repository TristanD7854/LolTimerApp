import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';

// todo : '' should redirect back to the search
const routes: Routes = [{ path: ':summonerName', component: GameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule {}
