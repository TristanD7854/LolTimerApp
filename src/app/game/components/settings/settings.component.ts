import { Component, OnInit } from '@angular/core';
import { first, Observable, of } from 'rxjs';
import {
  existingLanguages,
  Language,
  languages
} from '../../constants/languages.constants';
import { Settings } from '../../models/settings/settings.model';
import { LanguageService } from '../../services/language/language.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public showSummonerNamesChecked!: boolean;
  public selectedLanguage: Language = this.languageService.language;
  public allLanguages = existingLanguages;

  constructor(
    private settingsService: SettingsService,
    private languageService: LanguageService
  ) {}

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

  public selected(): void {
    this.languageService.setLanguage(this.selectedLanguage);
  }
}
