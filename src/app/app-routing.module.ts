import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'user',
    component: UserProfileComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  /* {
    path: 'cart',
    component: null
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
