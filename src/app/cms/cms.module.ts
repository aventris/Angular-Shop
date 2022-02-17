import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';


@NgModule({
  declarations: [
    MenuComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    DashboardComponent,
    GeneralInfoComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
