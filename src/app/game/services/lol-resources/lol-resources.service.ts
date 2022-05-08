import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../language/language.service';
import { VersionService } from './version/version.service';

@Injectable({
  providedIn: 'root'
})
export class LolResourcesService {
  private ddragonUrl = 'https://ddragon.leagueoflegends.com';
  private ddragonCanisbackUrl = 'https://ddragon.canisback.com';
  private cdragonUrl =
    'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/';

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private languageService: LanguageService
  ) {}

  // D-Dragon

  public callDDragonCdn<T>(specificRessource: string): Observable<T> {
    return this.http.get<T>(
      `${this.ddragonUrl}/cdn/${this.versionService.getCurrentVersion()}/${specificRessource}`
    );
  }

  public callDDragonCdnData<T>(specificRessource: string): Observable<T> {
    return this.callDDragonCdn(`data/${this.languageService.getLocale()}/${specificRessource}`);
  }

  public callDDragonCdnDataEn<T>(specificRessource: string): Observable<T> {
    return this.callDDragonCdn(`data/en_US/${specificRessource}`);
  }

  public callDDragonApi<T>(specificRessource: string): Observable<T> {
    return this.http.get<T>(`${this.ddragonUrl}/api/${specificRessource}`);
  }

  public getDDragonImageUrl(specificRessource: string): string {
    return `${this.ddragonUrl}/cdn/${this.versionService.getCurrentVersion()}/${specificRessource}`;
  }

  public getDDragonCanisbackImageUrl(specificRessource: string): string {
    return `${this.ddragonCanisbackUrl}/img/${specificRessource}`;
  }

  // C-Dragon

  public callCDragonCdn<T>(specificRessource: string): Observable<T> {
    return this.http.get<T>(`${this.cdragonUrl}/${specificRessource}`);
  }

  public getCDragonImageUrl(specificRessource: string): string {
    return `${this.cdragonUrl}/${specificRessource}`;
  }
}
