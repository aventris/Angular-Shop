import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private user: UserService) {}

  ngOnInit(): void {
    if (this.user.getToken()) {
      this.user.getProfile();
    }
  }
  title = 'angular-store';
}
