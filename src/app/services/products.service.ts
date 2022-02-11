import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';

const apiUrl = 'https://fakestoreapi.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(apiUrl);
  }

  getOne(id: string) {
    console.log(`${apiUrl}/${id}`);
    return this.http.get<Product>(`${apiUrl}/${id}`);
  }
}
