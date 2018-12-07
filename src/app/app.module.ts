import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkSearchComponent } from './drink-search/drink-search.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkService } from './drink.service';

@NgModule({
  declarations: [
    AppComponent,
    DrinkSearchComponent,
    DrinkDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    DrinkService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
