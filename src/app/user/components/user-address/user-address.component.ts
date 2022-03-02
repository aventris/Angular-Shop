import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InputValidationsService } from '../../../services/input-validations.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  @Input() user!: User;
  formIsDisabled = true;
  alert = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private inputValidationsService: InputValidationsService
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  error(input: string) {
    return this.inputValidationsService.handleErrorMessage(this.form, input);
  }

  handleSubmit() {
    this.alert = true;
  }

  enableForm() {
    this.formIsDisabled = false;
    Object.keys(this.form.value).forEach((input) => {
      this.form.controls[input].enable();
    });
  }

  generateForm() {
    this.form = this.formBuilder.group({
      city: [
        { value: this.user.address.city, disabled: true },
        Validators.required,
      ],
      street: [
        { value: this.user.address.street, disabled: true },
        Validators.required,
      ],
      number: [
        { value: this.user.address.number, disabled: true },
        Validators.required,
      ],
      zipcode: [
        { value: this.user.address.zipcode, disabled: true },
        [Validators.required, Validators.pattern(/^\d+\-?\d+$/)],
      ],
      info: { value: this.user.address.zipcode, disabled: true },
    });
  }
}
