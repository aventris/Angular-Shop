import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private user: UserService) {}

  ngOnInit(): void {}

  login() {
    console.log('Login...');
    this.user.login('mor_2314', '83r5^_').subscribe((data) => {
      console.log(data);
    });
  }
}
