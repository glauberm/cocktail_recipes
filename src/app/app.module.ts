import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrinkSearchComponent } from './drink-search/drink-search.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkService } from './drink.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DrinkSearchComponent,
    DrinkListComponent,
    DrinkDetailComponent,
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
