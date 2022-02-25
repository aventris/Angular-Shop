import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { UserService } from '../../services/user.service';

import { CartProduct } from '../../models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  products: CartProduct[] = [];
  cart = 0;
  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {}

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

  handleClick() {
    console.log('click');
    let token = this.userService.getToken();

    if (!token) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['checkout']);
    }
  }
}
