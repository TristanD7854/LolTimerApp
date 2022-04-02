import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VersionService } from '../version/version.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService
{
  // give champion name, champion stats + champion images

  // http://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/champion/Aatrox.json

  // https://developer.riotgames.com/docs/lol

  private championJsonUrl!: string;
  private allChampionInfo: any;

  constructor(private http: HttpClient, private versionService: VersionService) { }

  public initialize()
  {
    this.championJsonUrl = `http://ddragon.leagueoflegends.com/cdn/${this.versionService.getCurrentVersion()}/data/fr_FR/champion.json`;

    this.getAllChampionsInfo().subscribe(resp =>
    {
      this.allChampionInfo = resp;
    })
  }

  public getAllChampionsInfo(): Observable<any>
  {
    return this.http.get<any>(this.championJsonUrl);
  }

  public getChampionName(id: number): string
  {
    for (let championName in this.allChampionInfo.data) 
    {
      if (this.allChampionInfo.data.hasOwnProperty(championName))
      {
        if (this.allChampionInfo.data[championName].key == id)
        {
          return championName;
        }
      }
    };

    return "Champion not found";
  }

}
