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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
