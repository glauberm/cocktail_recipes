import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkSearchComponent } from './drink-search/drink-search.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';

const routes: Routes = [
  { path: '', component: DrinkSearchComponent },
  { path: 'drink/:id', component: DrinkDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}
