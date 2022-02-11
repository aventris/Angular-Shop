import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: string = '';
  product: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.productsService.getOne(id);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.product = data;
      });
  }
}
