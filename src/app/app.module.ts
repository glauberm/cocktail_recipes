import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrinkSearchComponent } from './drink-search/drink-search.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkService } from './drink.service';
import { RouterLinkDirectiveStub } from './drink-search/router-link-directive.stub';

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
