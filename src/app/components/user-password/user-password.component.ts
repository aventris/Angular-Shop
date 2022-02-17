import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
})
export class UserPasswordComponent implements OnInit {
  @Input() user!: User;

  sPassword = '';
  password = '';

  constructor() {}

  ngOnInit(): void {}
}
