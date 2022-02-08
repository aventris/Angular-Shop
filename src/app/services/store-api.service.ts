import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';

const apiUrl = 'https://fakestoreapi.com/products';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(apiUrl);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${apiUrl}/${id}`);
  }
}
