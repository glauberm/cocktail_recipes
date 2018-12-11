import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
    drinkService.searchDrinks();

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: DrinkService, useValue: drinkService }
      ]
    })
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


  it('should call drinkService', async(() => {
    expect(searchDrinksSpy.calls.any()).toBe(true);
  }));


  it('should display mock drink', async(() => {
    fixture.nativeElement.querySelector('#search')
      .dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(fixture.nativeElement);
      expect(fixture.nativeElement.querySelectorAll('.drink-list__item').length)
        .toBe(1);
    });
  }));

});
