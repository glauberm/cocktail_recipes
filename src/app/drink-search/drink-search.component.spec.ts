import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DrinkSearchComponent } from './drink-search.component';
import { DrinkService } from '../drink.service';
import { AppModule } from '../app.module';
import { mockDrinks } from '../mocks/drinks';

describe('DrinkSearchComponent', () => {
  let component: DrinkSearchComponent;
  let fixture: ComponentFixture<DrinkSearchComponent>;
  let drinkService;
  let searchDrinksSpy;

  beforeEach(async(() => {
    drinkService = jasmine.createSpyObj('DrinkService', ['searchDrinks']);
    searchDrinksSpy = drinkService.searchDrinks.and.returnValue(of(mockDrinks));

    TestBed.configureTestingModule({
      imports: [
        AppModule, RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: DrinkService, useValue: drinkService }
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should return message-empty', () => {
    expect(fixture.nativeElement.querySelector('#message-empty')).toBeTruthy();
  });


  it('should call heroService', async(() => {
    console.log(searchDrinksSpy);

    expect(searchDrinksSpy.calls.any()).toBe(true);
  }));


  it('should display mock drink', async(() => {
    expect(fixture.nativeElement.querySelectorAll('.drink-list__item').length)
      .toBe(1);
  }));

});
