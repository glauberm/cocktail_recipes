import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DrinkService } from '../../services/drink.service';
import { Drinks } from '../../models/drinks';

@Component({
  selector: 'app-drink-search',
  templateUrl: './drink-search.component.html',
  styleUrls: ['./drink-search.component.scss']
})

export class DrinkSearchComponent implements OnInit {
  public searchForm = new FormGroup({ searchInput: new FormControl('') });
  public results$: Observable<Drinks>;
  private searchTerms = new Subject<string>();

  constructor(
    private drinkService: DrinkService
  ) {}

  public search(): void {
    this.searchTerms.next(this.searchForm.get('searchInput').value);
  }

  public toggleVisibility(preview: Element): void {
    preview.classList.contains('drink-list__preview--active')
      ? preview.classList.remove('drink-list__preview--active')
      : preview.classList.add('drink-list__preview--active');
  }

  public ngOnInit(): void {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.drinkService
        .searchDrinks(query, document.getElementById('wave'))),
    );
  }
}
