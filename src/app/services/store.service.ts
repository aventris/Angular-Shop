import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shoppingCart: CartProduct[] = [];
  private cart = new BehaviorSubject<CartProduct[]>([]);
  shoppingCart$ = this.cart.asObservable();

  constructor() {}

  addProduct(product: Product) {
    let index = this.shoppingCart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      this.shoppingCart = [...this.shoppingCart, { ...product, quantity: 1 }];
    } else {
      this.shoppingCart[index] = {
        ...this.shoppingCart[index],
        quantity: this.shoppingCart[index].quantity + 1,
      };
    }
    this.cart.next(this.shoppingCart);
  }

  removeProduct(id: number) {
    let index = this.shoppingCart.findIndex((item) => item.id === id);
    this.shoppingCart.splice(index, 1);
    this.cart.next(this.shoppingCart);
  }

  increaseQuantity(id: number) {
    let index = this.shoppingCart.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.shoppingCart[index].quantity;
      this.shoppingCart[index] = {
        ...this.shoppingCart[index],
        quantity: this.shoppingCart[index].quantity + 1,
      };
      this.cart.next(this.shoppingCart);
    }
  }
  decreaseQuantity(id: number) {
    let index = this.shoppingCart.findIndex((item) => item.id === id);
    if (this.shoppingCart[index].quantity > 1) {
      if (index !== -1) {
        this.shoppingCart[index].quantity;
        this.shoppingCart[index] = {
          ...this.shoppingCart[index],
          quantity: this.shoppingCart[index].quantity - 1,
        };
        this.cart.next(this.shoppingCart);
      }
    } else {
      this.removeProduct(id);
    }
  }

  getTotal() {
    return this.shoppingCart.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  }
}
