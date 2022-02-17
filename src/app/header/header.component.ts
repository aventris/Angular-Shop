import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/product.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}
  totalProducts = 0;
  cartIsOpen: boolean = false;
  user: User | null = null;

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      this.user = data;
      console.log(data);
    });
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
