import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss'],
})
export class OrderPreviewComponent implements OnInit {
  products: CartProduct[] = [];
  user: User | null = null;
  total = 0;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.shoppingCart$.subscribe((data) => {
      this.products = data;
    });
    this.total = this.storeService.getTotal();

    this.userService.user$.subscribe((data) => {
      this.user = data;
    });
  }
}
