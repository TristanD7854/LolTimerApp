import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantRoutingModule } from './participant-routing.module';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';
import { TeamComponent } from './components/team/team.component';

@NgModule({
  declarations: [ParticipantListComponent, ParticipantComponent, TeamComponent],
  imports: [CommonModule, ParticipantRoutingModule]
})
export class ParticipantModule {}
