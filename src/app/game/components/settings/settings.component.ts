import { Component, OnInit } from '@angular/core';
import { first, Observable, of } from 'rxjs';
import { Settings } from '../../models/settings/settings.model';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public showSummonerNamesChecked!: boolean;

  constructor(private settingsService: SettingsService) {}

  public ngOnInit(): void {
    this.settingsService.settingsSubject
      .pipe(first())
      .subscribe((res: Settings) => {
        this.showSummonerNamesChecked = res.showSummonerNames;
      });
  }

  showSummonerNamesChange(): void {
    this.showSummonerNamesChecked = !this.showSummonerNamesChecked;
    this.settingsService.saveSettings(
      'showSummonerNames',
      this.showSummonerNamesChecked
    );
  }
}
