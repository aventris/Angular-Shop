import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  avatarUrl: string | null = null;
  constructor(private userService: UserService) {}
  user: User | null = null;
  sPassword = '';
  password = '';

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      if (data) {
        this.getAvatarHash(data.email);
        this.user = data;
      }
    });
    if (this.user) {
    }
  }

  getAvatarHash(email: string) {
    let hash = email.trim();
    hash = hash.toLowerCase();
    hash = Md5.hashStr(hash);
    this.avatarUrl = 'https://www.gravatar.com/avatar/' + hash + '?d=identicon';
  }
}
