import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppModule } from '../../app.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Cocktail Recipes" as headline', () => {
    expect(fixture.nativeElement.querySelector('.header__heading').textContent)
      .toEqual('Cocktail Recipes');
  });

  it('should display wave element', () => {
    expect(fixture.nativeElement.querySelector('.header__wave')).toBeTruthy();
  });

});
