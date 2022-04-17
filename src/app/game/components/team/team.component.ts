import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input()
  public participants!: CurrentGameParticipant[];

  public ngOnInit(): void {
    //console.log('participants = ' + this.participants);
  }
}
