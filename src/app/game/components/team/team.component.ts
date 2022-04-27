import { Component, Input } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  @Input()
  public team!: Team;
}
