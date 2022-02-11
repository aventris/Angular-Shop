import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreApiService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private storeApiService: StoreApiService) {}

  ngOnInit(): void {
    this.storeApiService.getAll().subscribe((data) => {
      console.log(data);
      this.products = data;
      this.loading = false;
    });
  }
}
