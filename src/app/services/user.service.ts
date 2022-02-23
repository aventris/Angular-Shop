import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

import { Auth } from '../models/auth.model';

import { CookieService } from 'ngx-cookie-service';

const API = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string | null = null;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  login(username: string, password: string, id: number) {
    console.log({ username, password });
    return this.http
      .post<Auth>(`${API}/auth/login`, { username, password })
      .pipe(tap((response) => this.saveToken(response.token, id)));
  }

  logout() {
    this.deleteToken();
    this.user.next(null);
  }

  getAll() {
    return this.http.get<User[]>(`${API}/users`);
  }
  getOne(id: string) {
    return this.http.get<User>(`${API}/users/${id}`);
  }

  saveToken(token: string, id: number) {
    this.cookieService.set('USER_TOKEN', token);
    this.cookieService.set('USER_ID', id.toString()); // User
    this.token = token;
    this.getProfile();
  }
  deleteToken() {
    this.cookieService.delete('USER_TOKEN', '/');
    this.cookieService.delete('USER_ID', '/');
    this.cookieService.deleteAll();
  }

  getToken() {
    const token = this.cookieService.get('USER_TOKEN');
    const id = this.cookieService.get('USER_ID');
    if (token && id) return token;
    return null;
  }

  getProfile() {
    const id = this.cookieService.get('USER_ID');
    this.http
      .get<User>(`${API}/users/${id}`)
      .subscribe((data) => this.user.next(data));
  }
}
