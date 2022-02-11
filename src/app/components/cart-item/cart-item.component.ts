import { Component, OnInit, Input } from '@angular/core';

import { CartProduct } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() product!: CartProduct;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  increaseQuantity() {
    this.storeService.increaseQuantity(this.product.id);
  }
  decreaseQuantity() {
    this.storeService.decreaseQuantity(this.product.id);
  }
  removeProduct() {
    this.storeService.removeProduct(this.product.id);
    console.log('Remove');
  }
}
