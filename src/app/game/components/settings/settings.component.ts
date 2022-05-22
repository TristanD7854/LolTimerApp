import { Component } from '@angular/core';
import { Language, languages } from '../../constants/languages.constants';
import { LanguageService } from '../../services/language/language.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public selectedLanguage: Language = this.languageService.language;
  public allLanguages = languages;

  constructor(public settingsService: SettingsService, private languageService: LanguageService) {}

  public selectLanguage(): void {
    this.languageService.setLanguage(this.selectedLanguage);
  }
}
