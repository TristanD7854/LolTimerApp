import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private championsService: ChampionsService,
    private router: Router,
    private saveService: SaveService
  ) {}

  onSubmitForm(): void {
    // call service with summonerName
    this.subscription.add(
      this.riotApiService
        .getCurrentGameInfoWithSummonerName(this.summonerName, true)
        .subscribe({
          next: (res: CurrentGameInfo) => {
            this.saveService.setCurrentGameInfo(res);
            this.router.navigateByUrl('game');
          },
          error: (e) => {
            console.log('error !');
            console.log(e);
          },
          complete: () => console.info('complete')
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
