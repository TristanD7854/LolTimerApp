import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../constants/languages.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public language: Language = 'en';

  constructor(private router: Router) {}

  public setLanguage(language: Language): void {
    this.language = language;
    this.router.navigateByUrl('');
  }
}
