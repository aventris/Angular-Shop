import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: GeneralInfoComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductFormComponent,
        data: { edit: true },
      },
      {
        path: 'products/add',
        component: ProductFormComponent,
        data: { edit: false },
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/edit/:id',
        component: UserFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
