import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './admin-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoadingComponent } from './components/loading/loading.component';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MenuComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    DashboardComponent,
    GeneralInfoComponent,
    OrderFormComponent,
    ProductFormComponent,
    UserFormComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, CmsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
