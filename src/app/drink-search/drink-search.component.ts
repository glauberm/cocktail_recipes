import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Drink } from '../drink';
import { DrinkService } from '../drink.service';

@Component({
  selector: 'app-drink-search',
  templateUrl: './drink-search.component.html',
  styleUrls: ['./drink-search.component.scss']
})

export class DrinkSearchComponent implements OnInit
{
  public results$: Observable<Drink>;
  private searchTerms = new Subject<string>();
  
  constructor(
    private drinkService: DrinkService
  ) {}

  public search(param: string): void {
    this.searchTerms.next(param);
  }

  public ngOnInit(): void {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.drinkService.searchDrinks(query)),
    );
  }
}
