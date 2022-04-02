import { Component, Input, OnInit } from '@angular/core';
import { CurrentGameParticipant } from '../../models/riot-api/spectator.model';
import { ChampionsService } from '../../services/champions/champions.service';

@Component({
  selector: 'champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent implements OnInit
{
  // ask champions-service + items-service + lcu-service to get total max hp of every champion, lifesteal, mr, armor ...
  // display items
  // another component will display if no anti heal vs lots of healing champs/items

  @Input()
  public currentGameParticipant!: CurrentGameParticipant;

  public championName!: string;

  constructor(private championsService: ChampionsService) { }

  ngOnInit(): void
  {
    this.championName = this.championsService.getChampionName(this.currentGameParticipant.championId);
    // display profileIconId
    // call championsService and get image
    // call RunesService, SummonerSpellsService and get name/images
  }
}
