import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TruncatecartPipe } from './pipes/truncatecart.pipe';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderPreviewComponent } from './components/order-preview/order-preview.component';
import { OrderAddressComponent } from './components/order-address/order-address.component';

import { FormsModule } from '@angular/forms';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    LoadingComponent,
    TruncatecartPipe,
    CartListComponent,
    CartItemComponent,
    LoginComponent,
    UserProfileComponent,
    OrderComponent,
    PaymentComponent,
    RegisterComponent,
    CheckoutComponent,
    OrderPreviewComponent,
    OrderAddressComponent,
    UserInfoComponent,
    UserAddressComponent,
    UserPasswordComponent,
    UserOrdersComponent,
    UserAdminComponent,
    LayoutComponent,
    ConfirmationModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
