import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Drink } from './drink';

@Injectable()
export class DrinkService
{
  private searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'          
  
  constructor(
    private http: HttpClient
  ) {}
  
  public searchDrinks(query: string): Observable<Drink[]> {
    if (!query.trim()) return of([]);

    return this.http.get<Drink[]>(`${this.searchUrl}?s=${query}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);

      return throwError(
        'It happened a problem completing your request. '
        + 'Check your connection and try again later.');
    } else {
      console.error(
        `Server error! ${error.error} - HTTP Status Code: ${error.status}`);

      return throwError(
        'The server didn\'t respond well to your request. '
        + 'Please try again later.');
    }
  };
}