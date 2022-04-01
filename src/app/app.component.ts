import { Component, OnInit } from '@angular/core';
import { interval, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import dataTristan from './tristan.json';
import dataYossune from './yassine.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  apiKey = "RGAPI-2dfce3b1-8377-47d6-ac42-5715670a14e6"
  title = 'LolTimerApp';
  riotApiUrl = "euw1.api.riotgames.com/lol"
  summonerName = "Yossune"
  encryptedSummonerId = ""
  activeGameSpectatorV4Url = ""
  summonerV4Url = `https://${this.riotApiUrl}/summoner/v4/summoners/by-name/${this.summonerName}?api_key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  // TODO : create modules, model (classes for json), add prettier, eslint, create service for fetch, create mock services, create folder for call to LCU API, do TUs

  ngOnInit(): void
  {
    console.log("ngOnInit")
    this.encryptedSummonerId = "LgxY911MKaqWeBzKz9YujBZQl47OK3SDa8HzYR1tEvxTyT4D";

    this.activeGameSpectatorV4Url = `https://${this.riotApiUrl}/spectator/v4/active-games/by-summoner/${this.encryptedSummonerId}?api_key=${this.apiKey}`;

    //this.getSummonerInformation();
    //this.getSummonerInformationBis();
    // call activeGameSpectatorV4Url

    /*
    const interval$ = interval(5000);
    setTimeout(() =>
    {
      interval$.subscribe(value => console.log(value));
    }, 3000);
    */
  }


  getSummonerInformationBis(): void
  {
    console.log("hello calling " + this.activeGameSpectatorV4Url)

    this.http.get<unknown[]>(this.activeGameSpectatorV4Url).subscribe(
      responseData => console.log(responseData)
    );
  }


  getSummonerInformation(): void
  {
    console.log("calling " + this.summonerV4Url)

    this.http.get<unknown[]>(this.summonerV4Url).subscribe(
      responseData => 
      {
        console.log(responseData);
        console.log((responseData as any).id);
      }
    );
  }

  public mockGetSummonerInformation()
  {
    console.log("calling mockGetSummonerInformation")

    const response = dataTristan;
    console.log(dataTristan)
    let obs = new Observable((subscriber) =>
    {
      setTimeout(() =>
      {
        console.log("setTimeout")

        subscriber.next(response);
        subscriber.complete();
      }, 3000);
    });

    console.log("hey")

    obs.subscribe(
      responseData => console.log(responseData)
    );
  }

}

/*
this.http.get<CustomResponse>(`${ this.apiUrl } /server/ping / ${ ipAddress } `)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );
*/
// euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SmashFace?api_key=
// -> donne encryptedSummonerId
// /lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}
