import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
}