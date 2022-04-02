import { Component, OnInit } from '@angular/core';
import { ChampionsService } from './core/services/champions/champions.service';
import { VersionService } from './core/services/version/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  constructor(private championsService: ChampionsService, private versionService: VersionService) { }

  ngOnInit(): void
  {
    let obsInitialize = this.versionService.initialize();

    obsInitialize.subscribe(() =>
      this.championsService.initialize()
    )
  }

  // todo : have an option to show/hide elos, by default it is hidden
  // todo : have an option to use or not lcu (it is shown if it can be used)

  /*
       const interval$ = interval(5000);
       setTimeout(() =>
       {
         interval$.subscribe(value => console.log(value));
       }, 3000);
       */
}
