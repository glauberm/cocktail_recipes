import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DrinkSearchComponent } from './components/drink-search/drink-search.component';
import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { DrinkService } from './services/drink.service';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive.stub';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DrinkSearchComponent,
    DrinkDetailComponent,
    RouterLinkDirectiveStub
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    DrinkService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
