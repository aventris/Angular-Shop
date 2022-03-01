import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, switchMap, zip } from 'rxjs';
import { Product, RegisterProduct } from '../../../models/product.model';

import { ProductsService } from '../../../services/products.service';
import { InputValidationsService } from '../../../services/input-validations.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  loading: boolean = true;
  product: Product | null = null;
  selectedFile: string | null | ArrayBuffer = '';
  alert = false;
  form!: FormGroup;
  edit: boolean | null = null;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private inputValidationsService: InputValidationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    zip(this.route.params, this.route.data)
      .pipe(
        switchMap((route) => {
          let edit = route[1]['edit'];
          this.edit = edit;
          if (!edit) this.createFormGroup(edit);
          return edit ? this.productsService.getOne(route[0]['id']) : EMPTY;
        })
      )
      .subscribe((data) => {
        if (data) this.product = data;
        this.createFormGroup(true);
      });
  }

  hanldeImageUpload(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }

  handleSubmit() {
    const newProduct: RegisterProduct = {
      title: this.form.value.title,
      price: this.form.value.price,
      category: this.form.value.category,
      description: this.form.value.description,
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };
    this.touchFormInputs();
    if (this.form.valid) {
      this.productsService.create(newProduct).subscribe((data) => {
        if (data) {
          this.alert = true;
        }
      });
    }
  }

  error(input: string) {
    if (this.form) {
      return this.inputValidationsService.handleErrorMessage(this.form, input);
    }
    return false;
  }

  createFormGroup(edit: boolean) {
    let title = edit ? this.product?.title : '';
    let price = edit ? this.product?.price : '';
    let category = edit ? this.product?.category : '';
    let description = edit ? this.product?.description : '';

    this.form = this.formBuilder.group({
      title: [title, Validators.required],
      price: [
        price,
        [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+|\d*)$/)],
      ],
      category: [category, Validators.required],
      description: [description, Validators.required],
    });
    console.log(this.edit);
    this.loading = false;
  }

  touchFormInputs() {
    Object.keys(this.form.value).forEach((input) => {
      this.form.controls[input].markAllAsTouched();
    });
  }
}
