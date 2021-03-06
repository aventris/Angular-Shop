import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';

import { InputValidationsService } from '../../../services/input-validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private inputValidationsService: InputValidationsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.touchFields();
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService.create(user).subscribe((data) => {
        if (data) this.success = true;
      });
    }
  }

  handleErrorMessage(input: string) {
    return this.inputValidationsService.handleErrorMessage(
      this.registerForm,
      input
    );
  }

  touchFields() {
    Object.keys(this.registerForm.value).forEach((input) => {
      this.registerForm.controls[input].markAsTouched();
    });
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
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
    };
  }

  ValidateRepeatPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.registerForm) {
        const primary = this.registerForm.controls['password'].value;
        if (!primary) return { noPassword: true };
        if (this.registerForm.controls['password'].invalid)
          return { invalid: true };
        const secoundary = control.value;
        return primary !== secoundary ? { doNotMatch: true } : null;
      }
      return null;
    };
  }

  createForm() {
    //if (this.registerForm) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w{5,}$/),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z????????????????????????]{2,}$/),
        ]),
      ],
      lastname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z????????????????????????]{2,}$/),
        ]),
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{8,12}$/),
        ]),
      ],
      password: ['', [Validators.required, this.validatePassword()]],
      rpassword: ['', [Validators.required, this.ValidateRepeatPassword()]],
    });
    //  }
  }
}
