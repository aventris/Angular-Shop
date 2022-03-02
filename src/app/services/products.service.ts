import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product, RegisterProduct } from '../models/product.model';

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
    return this.http.get<Product>(`${apiUrl}/${id}`);
  }

  getAllByCategory(category: string, offset?: number, limit?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${apiUrl}/category/${category}`, {
      params,
    });
  }

  create(product: RegisterProduct) {
    return this.http.post(`${apiUrl}`, product);
  }
  delete(id: number) {
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
