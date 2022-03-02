import { Component, OnInit, Input } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { User } from '../../../models/user.model';

import { InputValidationsService } from '../../../services/input-validations.service';
@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
})
export class UserPasswordComponent implements OnInit {
  @Input() user!: User;
  form!: FormGroup;
  sPassword = '';
  password = '';
  alert = false;

  constructor(
    private inputValidationsService: InputValidationsService,
    private formBuilder: FormBuilder
  ) {
    this.generateForm();
  }

  ngOnInit(): void {}

  error(input: string) {
    return this.inputValidationsService.handleErrorMessage(this.form, input);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.alert = true;
    } else {
      Object.keys(this.form.controls).forEach((input) => {
        const control = this.form.get(input);
        if (control) control.markAllAsTouched();
      });
    }
  }

  generateForm() {
    this.form = this.formBuilder.group({
      oldpassword: [
        'klein*#%*',
        [Validators.required, this.oldPasswordMatch()],
      ],
      password: ['', [Validators.required, this.validatePassword()]],
      rpassword: ['', [Validators.required, this.ValidateRepeatPassword()]],
    });
  }

  oldPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.form)
        if (control.value)
          if (this.user.password !== control.value) return { incorrect: true };
      return null;
    };
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value)
        return value.length < 8
          ? { length: true }
          : /\s+/.test(value)
          ? { blankSpace: true }
          : !/[A-Z]+/.test(value)
          ? { upperCase: true }
          : !/[a-z]+/.test(value)
          ? { lowerCase: true }
          : !/[0-9]+/.test(value)
          ? { numeric: true }
          : null;
      return null;
    };
  }

  ValidateRepeatPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.form) {
        const primary = this.form.controls['password'].value;
        const secoundary = control.value;
        if (secoundary) {
          return primary !== secoundary ? { doNotMatch: true } : null;
        }
        return null;
      }
      return null;
    };
  }
}
