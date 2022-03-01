import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  alert = false;
  confirmation = false;
  currentSelection: null | number = null;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });
  }

  handleAlert() {
    this.alert = false;
  }

  handleDelete() {
    const id = this.currentSelection;
    if (id) {
      this.productsService.delete(id).subscribe((data) => {
        if (data) {
          this.alert = true;
          this.confirmation = false;
          this.removeUser(id);
        }
      });
    }
  }

  handleConfirmation(id?: number) {
    this.confirmation = !this.confirmation;
    if (id) this.currentSelection = id;
  }

  removeUser(id: number) {
    let index = this.products.findIndex((product) => Number(product.id) === id);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
