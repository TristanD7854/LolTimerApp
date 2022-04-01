import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, switchMap, Observable } from 'rxjs';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { RiotApiService } from '../../services/riot-api/riot-api.service';

@Component({
  selector: 'search-summoner',
  templateUrl: './search-summoner.component.html',
  styleUrls: ['./search-summoner.component.scss']
})
export class SearchSummonerComponent implements OnInit, OnDestroy
{
  public summonerName!: string;
  private currentGameInfo!: CurrentGameInfo;
  private subscription: Subscription = new Subscription();

  constructor(private riotApiService: RiotApiService) { }

  ngOnInit(): void
  {
  }

  onSubmitForm(): void
  {
    // call service with summonerName
    this.subscription.add(
      this.riotApiService.getCurrentGameInfoWithSummonerName(this.summonerName)
        .subscribe((currentGameInfoResp: any) =>
        {
          // todo : manage errors
          this.currentGameInfo = currentGameInfoResp;
          console.log(this.currentGameInfo.bannedChampions)
        })
    );
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}
