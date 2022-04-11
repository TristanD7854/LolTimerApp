import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RiotApiService } from 'src/app/participant/services/riot-api/riot-api.service';
import { SaveService } from 'src/app/participant/services/save/save.service';
import {
  CustomErrorMessage,
  ErrorMessages
} from '../../../participant/models/errors/errors';

@Component({
  selector: 'search-summoner',
  templateUrl: './search-summoner.component.html',
  styleUrls: ['./search-summoner.component.scss']
})
export class SearchSummonerComponent implements OnDestroy {
  public summonerName!: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private riotApiService: RiotApiService,
    private router: Router,
    private saveService: SaveService
  ) {}

  onSubmitForm(): void {
    // call service with summonerName
    this.subscription.add(
      this.riotApiService
        .getCurrentGameInfoWithSummonerName(this.summonerName, true)
        .subscribe((res) => {
          //console.log('res = ' + JSON.stringify(res));

          if (res instanceof CustomErrorMessage) {
            // todo : use modal here
            if (res.message === ErrorMessages.summonerNotFound) {
              console.log('SUMMONER NOT FOUND');
            } else if (res.message === ErrorMessages.summonerNotInGame) {
              console.log('SUMMONER NOT IN GAME');
            } else {
              console.log('Other error, display message : ' + res.message);
            }
          } else {
            this.saveService.setCurrentGameInfo(res);
            this.router.navigateByUrl('game');
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
