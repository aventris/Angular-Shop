import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  success = false;
  registerForm = this.formBuilder.group({
    username: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\w{5,}$/)]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    firstname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/),
      ]),
    ],
    lastname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/),
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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Submitting...');
    //if (this.registerForm.valid) {
    const user = this.registerForm.value;
    this.userService.create(user).subscribe((data) => {
      if (data) this.success = true;
    });
    //}
  }

  handleErrorMessage(input: string) {
    return (
      this.registerForm.controls[input].invalid &&
      (this.registerForm.controls[input].touched ||
        this.registerForm.controls[input].dirty)
    );
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
}
