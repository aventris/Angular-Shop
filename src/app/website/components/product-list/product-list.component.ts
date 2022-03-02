import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';

import SwiperCore, { Navigation, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Autoplay]);
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  //products: Product[] = [];
  loading: boolean = true;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loading = false;
  }
}
