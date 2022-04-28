import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { useBackendMockData } from '../../constants/mock.constants';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private backEndUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public callBackend<T>(routeName: string, queryString: string): Observable<T> {
    return this.http.get<T>(
      `${this.backEndUrl}/${routeName}/${useBackendMockData ? 'mock/' : '/'}${queryString}`
    );
  }
}
