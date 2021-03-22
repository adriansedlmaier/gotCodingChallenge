import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHouse } from '../_models/IHouse';

@Injectable({
  providedIn: 'root'
})
export class GotApiService {
  private readonly baseUrl = 'https://www.anapioficeandfire.com/api/';
  private readonly PAGE_SIZE = 6;

  constructor(private http: HttpClient) {
  }

  public getHouses(page: number): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(`${this.baseUrl}/houses?page=${page}&pageSize=${this.PAGE_SIZE}`);
  }

  public getCharacter(memberUrl: string): Observable<any> {
    return this.http.get<any>(memberUrl);
  }
}
