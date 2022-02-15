import { Component, OnInit, Input } from '@angular/core';

import { StoreService } from '../../services/store.service';

import { CartProduct } from '../../models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  products: CartProduct[] = [];
  cart = 0;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.shoppingCart$.subscribe((products) => {
      this.products = products;
    });
  }

  getTotal() {
    return this.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  }

  increaseQuantity(id: string) {
    this.storeService.increaseQuantity(id);
  }
  decreaseQuantity(id: string) {
    this.storeService.decreaseQuantity(id);
  }

  removeProduct(id: string) {
    this.storeService.removeProduct(id);
  }
}
