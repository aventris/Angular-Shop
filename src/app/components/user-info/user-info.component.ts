import { Component, Input, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';

import { User } from '../../models/user.model';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user!: User;
  @Input() onTabChange!: (id: string) => void;
  avatarUrl: string | null = null;

  constructor() {}

  ngOnInit(): void {
    console.log(this.user);
    this.getAvatarHash(this.user.email);
  }

  getAvatarHash(email: string) {
    let hash = email.trim();
    hash = hash.toLowerCase();
    hash = Md5.hashStr(hash);
    this.avatarUrl = 'https://www.gravatar.com/avatar/' + hash + '?d=identicon';
  }

  onClick() {
    this.onTabChange('password');
  }
}
