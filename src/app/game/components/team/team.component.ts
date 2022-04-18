import { Component, Input } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  @Input()
  public participants!: CurrentGameParticipant[];
}
