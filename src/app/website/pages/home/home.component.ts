import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((data) => {
      this.loading = false;
      this.products = data;
    });
  }
}
