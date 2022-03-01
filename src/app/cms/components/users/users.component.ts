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
  loading: boolean = true;
  alert = false;
  confirmation = false;
  currentSelection: null | number = null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.loading = false;
    });
  }

  handleAlert() {
    this.alert = false;
  }

  handleDelete() {
    const id = this.currentSelection;
    if (id) {
      this.userService.delete(id).subscribe((data) => {
        if (data) {
          this.alert = true;
          this.confirmation = false;
          this.removeUser(id);
        }
      });
    }
  }

  handleConfirmation(id?: number) {
    this.confirmation = !this.confirmation;
    if (id) this.currentSelection = id;
  }

  removeUser(id: number) {
    let index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
