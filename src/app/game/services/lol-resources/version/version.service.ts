import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  public hasRetrievedVersion$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private currentVersion!: string;

  constructor(private http: HttpClient) {}

  public initialize(): void {
    const obs: Observable<string[]> = this.getVersion();
    obs.subscribe((res) => {
      const responseStr: string = res.toString();
      this.currentVersion = responseStr.split(',')[0];
      this.hasRetrievedVersion$.next(true);
    });
  }

  private getVersion(): Observable<string[]> {
    // can't use riotApiService as it causes a circular DI
    return this.http.get<string[]>(`https://ddragon.leagueoflegends.com/api/versions.json`);
  }

  public getCurrentVersion(): string {
    return this.currentVersion;
  }
}
