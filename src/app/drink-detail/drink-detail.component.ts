import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DrinkService } from '../drink.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})

export class DrinkDetailComponent implements OnInit {
  @Input() drink: string;
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location
  ) {}

  public getDrink(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.drinkService.getDrink(id).subscribe((drink) => this.drink = drink);
  }

  public getIngredients(drink: string): Array<string> {
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

  public goBack(): void {
    this.location.back();
  }

  public ngOnInit(): void {
    this.getDrink();
  }
}
