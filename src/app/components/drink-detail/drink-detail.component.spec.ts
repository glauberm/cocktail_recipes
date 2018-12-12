import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from '../../app.module';
import { DrinkDetailComponent } from './drink-detail.component';
import { DrinkService } from '../../services/drink.service';
import { mockDrinks, mockEmptyDrinks } from '../../../testing/drinks.mock';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';

describe('DrinkDetailComponent', () => {
  let component: DrinkDetailComponent;
  let fixture: ComponentFixture<DrinkDetailComponent>;
  let lookupDrinkSpy;
  let lookupDrink;
  let activatedRoute;
  let routerSpy;
  let navigate;

  describe('with drink', () => {
    beforeEach(async(() => {
      lookupDrinkSpy = jasmine.createSpyObj('DrinkService', ['lookupDrink']);
      lookupDrink = lookupDrinkSpy.lookupDrink.and.returnValue(of(mockDrinks));
      lookupDrinkSpy.lookupDrink();
  
      sharedConfigs();
  
      TestBed.configureTestingModule({
        imports: [ AppModule ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute},
          { provide: Router, useValue: routerSpy },
          { provide: DrinkService, useValue: lookupDrinkSpy },
        ]
      })
      .compileComponents();
    }));

    sharedTests();
  
    it('should display drink\'s name', () => {
      expect(fixture.nativeElement.querySelector('.drink-detail__heading')
          .textContent)
        .toEqual('Dark Caipirinha');
    });


    it('should display 3 ingredients', () => {
      expect(fixture.nativeElement
        .querySelectorAll('.drink-detail__sublist-group')
        .length).toBe(3);
    });
  });

  describe('with empty drink', () => {
    beforeEach(async(() => {
      lookupDrinkSpy = jasmine.createSpyObj('DrinkService', ['lookupDrink']);
      lookupDrink = lookupDrinkSpy.lookupDrink.and
        .returnValue(of(mockEmptyDrinks));
      lookupDrinkSpy.lookupDrink();
  
      sharedConfigs();
  
      TestBed.configureTestingModule({
        imports: [ AppModule ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute},
          { provide: Router, useValue: routerSpy },
          { provide: DrinkService, useValue: lookupDrinkSpy },
        ]
      })
      .compileComponents();
    }));
  
    sharedTests();
  
    it('should display Not Found', () => {
      expect(fixture.nativeElement.querySelector('.drink-detail__heading')
          .textContent)
        .toEqual('Not Found');
    });
  });

  function sharedConfigs() {
    activatedRoute = new ActivatedRouteStub({
      id: mockDrinks.drinks[0].idDrink });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    navigate = routerSpy.navigate as jasmine.Spy;
  }

  function sharedTests() {
    beforeEach(() => {
      fixture = TestBed.createComponent(DrinkDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  
  
    it('should call lookupDrink', async(() => {
      expect(lookupDrink.calls.any()).toBe(true);
    }));


    it('should return to home on close', async(() => {
      fixture.nativeElement.querySelector('.drink-detail__button')
        .dispatchEvent(new Event('click'));
  
      fixture.whenStable().then(() => {
        expect(navigate.calls.first().args[0]).toEqual(['']);
      });
    }));
  }
});
