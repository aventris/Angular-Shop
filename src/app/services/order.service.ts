import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../models/order.model';
const API = 'https://fakestoreapi.com/carts';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Order[]>(API);
  }

  getOne(id: string) {
    return this.httpClient.get<Order>(`${API}/id`);
  }
}
