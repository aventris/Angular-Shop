import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserAddressComponent,
    UserAdminComponent,
    UserInfoComponent,
    UserOrdersComponent,
    UserPasswordComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class UserModule {}
