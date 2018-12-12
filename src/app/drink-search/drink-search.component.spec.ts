import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DrinkSearchComponent } from './drink-search.component';
import { DrinkDetailComponent } from '../drink-detail/drink-detail.component';
import { DrinkService } from '../drink.service';
import { AppModule } from '../app.module';
import { mockDrinks } from '../mocks/drinks';
import { RouterLinkDirectiveStub } from './router-link-directive.stub';

describe('DrinkSearchComponent', () => {
  let component: DrinkSearchComponent;
  let fixture: ComponentFixture<DrinkSearchComponent>;
  let searchDrinksSpy;
  let searchDrinks;
  let linkDe;
  let drinkLink;

  beforeEach(async(() => {
    searchDrinksSpy = jasmine.createSpyObj('DrinkService', ['searchDrinks']);
    searchDrinks = searchDrinksSpy.searchDrinks.and.returnValue(of(mockDrinks));
    searchDrinksSpy.searchDrinks();

    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        { provide: DrinkService, useValue: searchDrinksSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call searchDrinks', async(() => {
    expect(searchDrinks.calls.any()).toBe(true);
  }));


  it('should return message-empty', () => {
    expect(fixture.nativeElement.querySelector('#message-empty')).toBeTruthy();
  });


  it('should display mock drink', async(() => {
    fixture.nativeElement.querySelector('#search')
      .dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      expect(fixture.nativeElement.querySelectorAll('.drink-list__item').length)
        .toBe(1);
    });
  }));

  it('should toggle mock drink preview', async(() => {
    fixture.nativeElement.querySelector('#search')
      .dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      fixture.nativeElement.querySelector('.drink-list__button')
        .dispatchEvent(new Event('click'));

      expect(fixture.nativeElement.querySelector('.drink-list__preview')
          .classList.contains('drink-list__preview--active')
        ).toBe(true);

      fixture.nativeElement.querySelector('.drink-list__button')
        .dispatchEvent(new Event('click'));

      expect(fixture.nativeElement.querySelector('.drink-list__preview')
          .classList.contains('drink-list__preview--active')
        ).toBe(false);
    });
  }));

  it('should follow drink link on click', async(() => {
    fixture.nativeElement.querySelector('#search')
      .dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      linkDe = fixture.debugElement
        .query(By.directive(RouterLinkDirectiveStub));
      drinkLink = linkDe.injector.get(RouterLinkDirectiveStub);

      linkDe.triggerEventHandler('click', drinkLink);

      fixture.detectChanges();
    
      expect(drinkLink.navigatedTo)
        .toBe('/drink/' + mockDrinks.drinks[0].idDrink);
    });
  }));
});
