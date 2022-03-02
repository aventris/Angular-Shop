import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;
  isAdmin = false;
  public tab = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      this.tab = data['tab'];
    });
    this.userService.user$.subscribe((data) => {
      if (data) {
        this.user = data;
        if (data.id === environment.ADMIN_USER_ID) {
          this.isAdmin = true;
        }
      }
      this.loading = false;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

  onTabChange = (id: string) => {
    this.tab = id;
    this.router.navigate(['/user/profile'], { queryParams: { tab: id } });
  };
}
