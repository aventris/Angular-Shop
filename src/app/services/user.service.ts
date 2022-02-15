import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'https://fakestoreapi.com/auth/login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('request');
    return this.http.post(API, { username, password });
  }
}
