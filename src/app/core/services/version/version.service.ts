import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService
{
  private versionUrl: string = 'https://ddragon.leagueoflegends.com/api/versions.json';
  private currentVersion!: string;

  constructor(private http: HttpClient) { }

  public initialize(): Observable<any>
  {
    let obs: Observable<any> = this.getVersion();
    obs.subscribe(resp =>
    {
      let responseStr: string = resp.toString();
      this.currentVersion = responseStr.split(',')[0];
    });

    return obs;
  }

  public getVersion(): Observable<any>
  {
    return this.http.get<any>(this.versionUrl);
  }

  public getCurrentVersion(): string
  {
    return this.currentVersion;
  }

}
