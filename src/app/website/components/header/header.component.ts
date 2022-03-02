import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {}
  totalProducts = 0;
  cartIsOpen: boolean = false;
  user: User | null = null;
  menuOpen = false;
  userMenu = false;
  isAdmin = false;

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
    this.menuOpen = false;
    this.userMenu = false;
  }
  closeCart(event: any) {
    this.cartIsOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.cartIsOpen = false;
    this.userMenu = false;
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
    this.menuOpen = false;
    this.cartIsOpen = false;
  }

  isActive(url: string) {
    return this.router.url.includes(`?tab=${url}`);
  }
  logout() {
    this.userService.logout();
    this.toggleUserMenu();
    this.router.navigateByUrl('/home');
  }
}
