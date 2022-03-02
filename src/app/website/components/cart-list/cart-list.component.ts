import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CartProduct } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  @Output() toggleCart = new EventEmitter();

  products: CartProduct[] = [];
  total = 0;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.shoppingCart$.subscribe((data) => {
      this.products = data;
      this.total = this.storeService.getTotal();
    });
  }

  onClose() {
    console.log('Closing');
    this.toggleCart.emit('');
  }
}
