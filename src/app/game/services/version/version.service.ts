import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private versionUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
  private currentVersion!: string;

  public dataDragonUrl!: string;

  constructor(private http: HttpClient) {}

  public initialize(): Observable<any> {
    const obs: Observable<any> = this.getVersion();
    obs.subscribe((resp) => {
      const responseStr: string = resp.toString();
      this.currentVersion = responseStr.split(',')[0];

      this.dataDragonUrl = `http://ddragon.leagueoflegends.com/cdn/${this.currentVersion}`;
    });

    return obs;
  }

  private getVersion(): Observable<any> {
    return this.http.get<any>(this.versionUrl);
  }

  public getCurrentVersion(): string {
    return this.currentVersion;
  }
}
