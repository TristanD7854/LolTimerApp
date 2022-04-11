import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, tap, throwError } from 'rxjs';
import { CustomErrorMessage, ErrorMessages } from '../../models/errors/errors';
import { CurrentGameInfo } from '../../models/riot-api/spectator.model';
import { ChampionsService } from '../../services/champions/champions.service';
import { RiotApiService } from '../../services/riot-api/riot-api.service';
import { SaveService } from '../../services/save/save.service';

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
