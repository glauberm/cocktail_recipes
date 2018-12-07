import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DrinkService }  from '../drink.service';
import { Drink } from '../drink';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})

export class DrinkDetailComponent implements OnInit
{
  @Input() drink: Drink;
 
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location
  ) {}

  public getDrink(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.drinkService.getDrink(id).subscribe((drink) => this.drink = drink);
  }

  public goBack(): void {
    this.location.back();
  }
 
  public ngOnInit(): void {
    this.getDrink();
  }
}