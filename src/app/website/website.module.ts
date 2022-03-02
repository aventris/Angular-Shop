import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { PaymentComponent } from './pages/payment/payment.component';
import { OrderAddressComponent } from './pages/order-address/order-address.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';

import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LayoutComponent } from './components/layout/layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { TruncatecartPipe } from './pipes/truncatecart.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    FooterComponent,
    CartListComponent,
    CartItemComponent,
    PaymentComponent,
    HomeComponent,
    TruncatecartPipe,
    CheckoutComponent,
    OrderAddressComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    SharedModule,
  ],
})
export class WebsiteModule {}
