import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userType: boolean | null = false;
  constructor(private user: UserService) {}

  ngOnInit(): void {}

  login() {
    console.log('Login...');
    const user = this.userType
      ? environment.ADMIN_USER_NAME
      : environment.USER_NAME;
    const password = this.userType
      ? environment.ADMIN_USER_PASSWORD
      : environment.USER_PASSWORD;
    const id = this.userType ? environment.ADMIN_USER_ID : environment.USER_ID;

    this.user.login(user, password, id).subscribe();
  }
}
