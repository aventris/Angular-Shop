import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return this.productsService.getAllByCategory(id);
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnInit(): void {}
}
