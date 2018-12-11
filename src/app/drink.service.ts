import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Drinks } from './models/drinks';

@Injectable()

export class DrinkService {
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  public searchUrl = `${this.baseUrl}search.php?s=`;
  public lookupUrl = `${this.baseUrl}lookup.php?i=`;

  constructor(
    private http: HttpClient
  ) {}

  public searchDrinks(query: string, waveElement: Element): Observable<Drinks> {
    if (!query.trim()) { return of(); }
    if (waveElement) { waveElement.classList.add('header__wave--loading'); }

    return this.http.get<Drinks>(this.searchUrl + query)
      .pipe(
        catchError((err) => throwError(err)),
        finalize(() => {
          if (waveElement) {
            waveElement.classList.remove('header__wave--loading');
          }
        }));
  }

  public lookupDrink(id: number, waveElement: Element): Observable<Drinks> {
    if (waveElement) { waveElement.classList.add('header__wave--loading'); }

    return this.http.get<Drinks>(this.lookupUrl + id)
      .pipe(
        catchError((err) => throwError(err)),
        finalize(() => {
          if (waveElement) {
            waveElement.classList.remove('header__wave--loading');
          }
        }));
  }
}
