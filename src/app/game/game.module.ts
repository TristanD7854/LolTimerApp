import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';
import { TeamComponent } from './components/team/team.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameComponent } from './components/game/game.component';
import { ParticipantRoutingModule } from './game-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { ParticipantSummsComponent } from './components/participant-summs/participant-summs.component';
import { ParticipantRunesComponent } from './components/participant-runes/participant-runes.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ParticipantListComponent,
    ParticipantComponent,
    TeamComponent,
    GameComponent,
    SettingsComponent,
    ParticipantSummsComponent,
    ParticipantRunesComponent,
    GameInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ParticipantRoutingModule,
    MatTooltipModule
  ]
})
export class GameModule {}
