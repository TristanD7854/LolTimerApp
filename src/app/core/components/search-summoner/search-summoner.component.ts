import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomErrorMessage, ErrorMessages } from 'src/app/game/models/errors/errors';
import { SaveService } from 'src/app/game/services/save/save.service';
import { SpectatorApiService } from '../../../game/services/riot-api/spectator-api/spectator-api.service';

@Component({
  selector: 'search-summoner',
  templateUrl: './search-summoner.component.html',
  styleUrls: ['./search-summoner.component.scss']
})
export class SearchSummonerComponent implements OnDestroy {
  public summonerName!: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private spectatorApiService: SpectatorApiService,
    private router: Router,
    private saveService: SaveService
  ) {}

  public onSubmitForm(): void {
    this.subscription.add(
      this.spectatorApiService
        .getCurrentGameInfoWithSummonerName(this.summonerName)
        .subscribe((res) => {
          if (res instanceof CustomErrorMessage) {
            // todoafter : use modal here
            if (res.message === ErrorMessages.summonerNotFound) {
              console.log('SUMMONER NOT FOUND');
            } else if (res.message === ErrorMessages.summonerNotInGame) {
              console.log('SUMMONER NOT IN GAME');
            } else {
              console.log('Other error, display message : ' + res.message);
            }
          } else {
            this.saveService.setCurrentGameInfo(res);
            this.saveService.setMainParticipant(this.summonerName);
            this.router.navigateByUrl(`game/${this.summonerName}`);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
