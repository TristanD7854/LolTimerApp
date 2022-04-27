import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Language, languages, Locale } from '../../constants/languages.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public language: Language = 'en';

  constructor(private router: Router) {}

  public getLocale(): Locale {
    return languages[this.language];
  }

  public setLanguage(language: Language): void {
    this.language = language;
    // todo : call a service to do that, should not use router directly
    this.router.navigateByUrl('');
  }
}
