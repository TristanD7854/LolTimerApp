import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input()
  public team!: Team;

  public ngOnInit(): void {
    //
  }
}
