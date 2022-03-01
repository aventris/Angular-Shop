import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputValidationsService {
  constructor() {}

  handleErrorMessage(form: FormGroup, input: string) {
    return (
      form.controls[input].invalid &&
      (form.controls[input].touched || form.controls[input].dirty)
    );
  }
}
