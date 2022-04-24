import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultSettings } from '../../constants/settings.constants';
import { Settings } from '../../models/settings/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings = defaultSettings;
  public settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject(defaultSettings);

  public saveSettings(settingsProperty: string, value: boolean) {
    let isDefined = false;
    Object.keys(defaultSettings).forEach((key) => {
      if (key == settingsProperty) {
        isDefined = true;
      }
    });
    if (!isDefined) {
      return;
    }

    this.settings = {
      ...this.settings,
      [settingsProperty]: value
    };

    this.settingsSubject.next(this.settings);
  }
}
