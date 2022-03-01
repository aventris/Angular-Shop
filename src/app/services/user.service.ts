import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5';
import { User, RegisterUser, UpdateUser } from '../models/user.model';
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

  create(user: any) {
    const newUser: RegisterUser = {
      email: user?.email,
      username: user.username,
      password: Md5.hashStr(String(user.password)),
      name: {
        firstname: user.firstname,
        lastname: user.firstname,
      },
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '',
          long: '',
        },
      },
      phone: user.phone,
    };
    return this.http.post(`${API}/users`, newUser);
  }

  update(id: number, user: any) {
    const newInfo = {
      username: user.username,
      phone: user.phone,

      name: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
      address: {
        geolocation: {},
      },
    };
    console.log(newInfo);
    return this.http.patch(`${API}/users/${id}`, newInfo);
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
