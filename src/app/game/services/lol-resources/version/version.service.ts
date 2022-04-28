import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private currentVersion!: string;

  constructor(private http: HttpClient) {}

  public initialize(): Observable<any> {
    const obs: Observable<any> = this.getVersion();
    obs.subscribe((resp) => {
      const responseStr: string = resp.toString();
      this.currentVersion = responseStr.split(',')[0];
    });

    return obs;
  }

  private getVersion(): Observable<any> {
    // can't use riotApiService as it causes a circular DI
    return this.http.get<any>(`https://ddragon.leagueoflegends.com/api/versions.json`);
  }

  public getCurrentVersion(): string {
    return this.currentVersion;
  }
}
