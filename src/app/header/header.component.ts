import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/product.model';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private storeService: StoreService) {}
  totalProducts = 0;
  cartIsOpen: boolean = false;

  ngOnInit(): void {
    this.storeService.shoppingCart$.subscribe((data) => {
      this.totalProducts = data.reduce(
        (acc, product) => product.quantity + acc,
        0
      );
    });
  }

  toggleCart() {
    this.cartIsOpen = !this.cartIsOpen;
  }
  closeCart(event: any) {
    this.cartIsOpen = false;
  }
}
