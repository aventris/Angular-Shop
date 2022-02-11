import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(private storeService: StoreService) {}
  @Input() product!: Product;

  ngOnInit(): void {}

  addToCart() {
    console.log('Click');
    this.storeService.addProduct(this.product);
  }
}
