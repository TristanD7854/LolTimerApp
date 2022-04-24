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
import { SummonerSpellComponent } from './components/summoner-spell/summoner-spell.component';
import { CommandLineComponent } from './components/command-line/command-line.component';
import { MinuteSecondPipe } from './pipes/minute-second.pipe';

import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { ParticipantRankComponent } from './components/participant-rank/participant-rank.component';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 0,
  touchendHideDelay: 1000,
  position: 'below',
  disableTooltipInteractivity: true
};

@NgModule({
  declarations: [
    ParticipantListComponent,
    ParticipantComponent,
    TeamComponent,
    GameComponent,
    SettingsComponent,
    ParticipantSummsComponent,
    ParticipantRunesComponent,
    GameInfoComponent,
    SummonerSpellComponent,
    CommandLineComponent,
    MinuteSecondPipe,
    ParticipantRankComponent
  ],
  imports: [CommonModule, FormsModule, ParticipantRoutingModule, MatTooltipModule],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }]
})
export class GameModule {}
