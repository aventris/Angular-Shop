import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userType: boolean | null = true;
  loading: boolean = false;
  userSelection: boolean = false;

  constructor(
    private user: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  selectUserType() {
    this.userSelection = true;
  }

  login(admin: boolean) {
    this.loading = true;
    this.userSelection = false;
    const user = this.userType
      ? environment.ADMIN_USER_NAME
      : environment.USER_NAME;
    const password = this.userType
      ? environment.ADMIN_USER_PASSWORD
      : environment.USER_PASSWORD;
    const id = admin ? environment.ADMIN_USER_ID : environment.USER_ID;

    this.user.login(user, password, id).subscribe((_) => {
      if (admin) this.router.navigateByUrl('/user/profile?tab=admin');
      else this.location.back();
    });
  }
}
