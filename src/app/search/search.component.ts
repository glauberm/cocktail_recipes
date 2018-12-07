import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DrinkService } from '../drink.service';
import { Drink } from '../drink';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit
{
  public results$: Observable<Drink[]>;
  private searchTerms = new Subject<string>();
  
  constructor(
    private drinkService: DrinkService
  ) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit() {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.drinkService.searchDrinks(query)),
    );
  }
}
