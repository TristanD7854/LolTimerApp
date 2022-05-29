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

  public showModal = false;
  public headerModal = '';
  public textModal = '';

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
            if (res.message === ErrorMessages.summonerNotFound) {
              this.showModalWithText(
                '' + this.summonerName + ' : ' + res.message,
                'Maybe this summoner is not in EUW'
              );
            } else if (res.message === ErrorMessages.summonerNotInGame) {
              this.showModalWithText(res.message, '');
            } else {
              this.showModalWithText(res.message, '');
            }
          } else {
            this.saveService.setCurrentGameInfo(res);
            this.saveService.setMainParticipant(this.summonerName);
            this.router.navigateByUrl(`game/${this.summonerName}`);
          }
        })
    );
  }

  private showModalWithText(header: string, text: string): void {
    this.showModal = true;
    this.headerModal = header;
    this.textModal = text;
  }

  public hideModal() {
    this.showModal = false;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
