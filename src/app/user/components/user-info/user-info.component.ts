import { Component, Input, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user!: User;
  @Input() onTabChange!: (id: string) => void;
  avatarUrl: string | null = null;
  formIsDisabled = true;
  loading = false;
  alert = false;
  form!: FormGroup;

  //form = this.formBuilder.group
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAvatarHash(this.user.email);
    this.createForm();
  }

  getAvatarHash(email: string) {
    let hash = email.trim();
    hash = hash.toLowerCase();
    hash = Md5.hashStr(hash);
    this.avatarUrl = 'https://www.gravatar.com/avatar/' + hash + '?d=identicon';
  }

  onChangePassword() {
    this.onTabChange('password');
  }

  enableForm() {
    this.formIsDisabled = false;
    this.form.controls['firstname'].enable();
    this.form.controls['lastname'].enable();
    this.form.controls['username'].enable();
    this.form.controls['phone'].enable();
  }
  disableForm() {
    this.formIsDisabled = true;
    this.form.controls['firstname'].disable();
    this.form.controls['lastname'].disable();
    this.form.controls['username'].disable();
    this.form.controls['phone'].disable();
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstname: new FormControl(
        { value: this.user.name.firstname, disabled: true },
        [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/)]
      ),
      lastname: [
        { value: this.user.name.lastname, disabled: true },
        [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/)],
      ],
      username: [
        { value: this.user.username, disabled: true },
        [Validators.required, Validators.pattern(/^\w{5,}$/)],
      ],
      phone: [
        { value: this.user.phone, disabled: true },
        [Validators.required, Validators.pattern(/^\d((\-\d+)|\d+){2,}$/)],
      ],
    });
  }

  handleErrorMessage(input: string) {
    return (
      this.form.controls[input].invalid &&
      (this.form.controls[input].touched || this.form.controls[input].dirty)
    );
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.userService
        .update(this.user.id, this.form.value)
        .subscribe((data) => {
          if (data) {
            this.alert = true;
          }
        });
    }
  }

  handleConfirmation() {
    this.disableForm();
    this.alert = false;
  }
}
