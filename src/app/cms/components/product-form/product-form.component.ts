import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../../models/product.model';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  product: Product | null = null;
  selectedFile: string | null | ArrayBuffer = '';
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.productsService.getOne(params['id'])))
      .subscribe((data) => {
        console.log(data);
        this.product = data;
      });
  }

  hanldeImageUpload(imageInput: any) {
    console.log(imageInput);
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }
}
