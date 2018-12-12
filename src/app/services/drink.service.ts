import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
import { Drinks } from '../models/drinks';

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
        retry(3),
        catchError(this.handleError),
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
        retry(3),
        catchError(this.handleError),
        finalize(() => {
          if (waveElement) {
            waveElement.classList.remove('header__wave--loading');
          }
        }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`A client-side error occurred: ${error.error.message}`);
    } else {
      console.error(
        `A backend-side error occurred: ${error.status}: ${error.error}`);
    }

    alert('Something went wrong. Refresh the page and try again.');

    return throwError(error);
  }
}
