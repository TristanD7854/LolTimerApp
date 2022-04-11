import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';

// todo : '' should redirect back to the search
const routes: Routes = [
  { path: ':summonerName', component: ParticipantListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule {}
