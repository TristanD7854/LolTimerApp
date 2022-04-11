import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantRoutingModule } from './participant-routing.module';
import { ParticipantComponent } from '../core/components/participant/participant.component';
import { ParticipantListComponent } from '../core/components/participant-list/participant-list.component';

@NgModule({
  declarations: [ParticipantListComponent, ParticipantComponent],
  imports: [CommonModule, ParticipantRoutingModule]
})
export class ParticipantModule {}
