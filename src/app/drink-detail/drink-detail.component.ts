import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrinkService } from '../drink.service';
import { Drinks } from '../models/drinks';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})

export class DrinkDetailComponent implements OnInit {
  @Input() drink: Drinks;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private drinkService: DrinkService
  ) {}

  public lookupDrink(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.drinkService.lookupDrink(id, document.getElementById('wave'))
      .subscribe((drink) => this.drink = drink);
  }

  public getIngredients(drink: string): Array<Drinks> {
    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
      if (drink['strIngredient' + i]
        && drink['strMeasure' + i]
        && drink['strIngredient' + i].length
        && drink['strMeasure' + i].length) {
        ingredients = ingredients.concat({
          ingredient: drink['strIngredient' + i],
          measure: drink['strMeasure' + i]
        });
      }
    }

    return ingredients;
  }

  public close(): void {
    this.router.navigate([''], { replaceUrl: true });
  }

  public ngOnInit(): void {
    this.lookupDrink();
  }
}
