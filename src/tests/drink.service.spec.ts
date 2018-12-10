
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DrinkService } from '../app/services/drink.service';
import { mockDrinks } from './mocks/drinks';

describe('DrinkService', () => {
  let httpTestingController: HttpTestingController;
  let drinkService: DrinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DrinkService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    drinkService = TestBed.get(DrinkService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('searchDrinks', () => {
    const testTerm = 'Margarita';
    let searchUrl: string;

    beforeEach(() => {
      drinkService = TestBed.get(DrinkService);
      searchUrl = drinkService.searchUrl + testTerm;
    });

    it('should return mock drinks', () => {
      drinkService.searchDrinks(testTerm, null)
        .subscribe(
          (drinks) => { expect(drinks).toEqual(mockDrinks) },
          (error) => fail(error));

      const req = httpTestingController.expectOne(searchUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(mockDrinks);
    });

    it('should be OK returning no drinks', () => {
      drinkService.searchDrinks(testTerm, null)
        .subscribe(
          (drinks) => expect(drinks.drinks.length)
            .toEqual(0, 'should have empty drinks array'),
          (error) => fail(error)
        );

      const req = httpTestingController.expectOne(searchUrl);
      req.flush([]);
    });

    it('should return expected mock drinks and no drinks', () => {
      drinkService.searchDrinks(testTerm, null).subscribe();
      drinkService.searchDrinks(testTerm, null).subscribe(
        (drinks) => expect(drinks)
          .toEqual(mockDrinks, 'should return expected drinks'),
        (error) => fail(error)
      );

      const requests = httpTestingController.match(searchUrl);
      expect(requests.length).toEqual(2, 'calls to searchDrinks');

      requests[0].flush([]);
      requests[1].flush(mockDrinks);
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      
      drinkService.searchDrinks(testTerm, null).subscribe(
        (drinks) => fail('Expected to fail.'),
        (error) => expect(error.error).toContain(msg)
      );

      const req = httpTestingController.expectOne(searchUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('lookupDrink', () => {
    const testId = 11202;
    let lookupUrl: string;

    beforeEach(() => {
      drinkService = TestBed.get(DrinkService);
      lookupUrl = drinkService.lookupUrl + testId;
    });

    it('should return mock drink', () => {
      drinkService.lookupDrink(testId, null)
        .subscribe(
          (drinks) => { expect(drinks).toEqual(mockDrinks) },
          (error) => fail(error));

      const req = httpTestingController.expectOne(lookupUrl);

      expect(req.request.method).toEqual('GET');
      req.flush(mockDrinks);
    });

    it('should be OK returning no drink', () => {
      drinkService.lookupDrink(testId, null)
        .subscribe(
          (drinks) => expect(drinks.drinks.length)
            .toEqual(0, 'should have empty drink array'),
          (error) => fail(error)
        );

      const req = httpTestingController.expectOne(lookupUrl);
      req.flush([]);
    });

    it('should return expected mock drink and no drink', () => {
      drinkService.lookupDrink(testId, null).subscribe();
      drinkService.lookupDrink(testId, null).subscribe(
        (drinks) => expect(drinks)
          .toEqual(mockDrinks, 'should return expected drinks'),
        (error) => fail(error)
      );

      const requests = httpTestingController.match(lookupUrl);
      expect(requests.length).toEqual(2, 'calls to searchDrinks');

      requests[0].flush([]);
      requests[1].flush(mockDrinks);
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      
      drinkService.lookupDrink(testId, null).subscribe(
        (drinks) => fail('Expected to fail.'),
        (error) => expect(error.error).toContain(msg)
      );

      const req = httpTestingController.expectOne(lookupUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

});
