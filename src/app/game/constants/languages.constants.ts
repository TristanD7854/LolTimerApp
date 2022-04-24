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

// todo : clean this bordel, too much work to add a single language

export declare const LOCALES: [
  {
    code: 'fr_FR';
    lang: 'fr';
  },
  {
    code: 'en_US';
    lang: 'en';
  }
];

export declare type LocaleCode = typeof LOCALES[number]['code'];
