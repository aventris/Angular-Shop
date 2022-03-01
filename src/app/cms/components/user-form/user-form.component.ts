import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { InputValidationsService } from '../../../services/input-validations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;
  edit = false;
  alert = false;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private inputValidationsService: InputValidationsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.userService.getOne(params['id'])))
      .subscribe((data) => {
        this.user = data;

        this.createForm();
      });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.userService
        .update(this.user!.id, this.form.value)
        .subscribe((data) => {
          if (data) this.alert = true;
        });
    }
  }

  createForm() {
    if (this.user) {
      this.form = this.formBuilder.group({
        firstname: [
          this.user.name.firstname,
          [
            Validators.required,
            Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/),
          ],
        ],
        lastname: [
          this.user.name.lastname,
          [
            Validators.required,
            Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]{2,}$/),
          ],
        ],
        email: [this.user.email, [Validators.required, Validators.email]],
        username: [
          this.user.username,
          [Validators.required, Validators.pattern(/^\w{5,}$/)],
        ],
        phone: [
          this.user.phone,
          [Validators.required, Validators.pattern(/^\d((\-\d+)|\d+){2,}$/)],
        ],

        city: [this.user.address.city, Validators.required],
        street: [this.user.address.street, Validators.required],
        number: [this.user.address.number, Validators.required],
        zipcode: [
          this.user.address.zipcode,
          [Validators.required, Validators.pattern(/^\d+\-?\d+$/)],
        ],
        info: 'Building access from Charles Av.',
      });
      this.loading = false;
    }
  }
  handleErrorMessage(input: string) {
    return this.inputValidationsService.handleErrorMessage(this.form, input);
  }
}
