/*
export const languages: Languages = {
  fr: 'fr_FR',
  en: 'en_US'
};
export interface Languages {
  fr: Locale;
  en: Locale;
}

export type Language = 'fr' | 'en';
export type Locale = 'fr_FR' | 'en_US';

export const existingLanguages: Language[] = ['fr', 'en'];
*/

export const LOCALES = [
  {
    code: 'fr_FR',
    lang: 'fr'
  },
  {
    code: 'en_US',
    lang: 'en'
  }
];

export const languages = LOCALES.map((country) => country.lang);
export declare const localeCodes: typeof LOCALES[number]['code'];

export declare type Language = typeof LOCALES[number]['lang'];
export declare type LocaleCode = typeof LOCALES[number]['code'];

export function getLocaleCode(language: Language): LocaleCode {
  for (const locale of LOCALES) {
    if (locale.lang == language) {
      return locale.code;
    }
  }
  return 'en_US';
}
