import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm = this.fb.nonNullable.group({
    name: [''],
    description: [''],
    wholesalePrice: [0],
    retailPrice: [0],
    quantity: [0],
  });

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  productId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminProductService: AdminProductService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.productId = id;
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = this.productForm.getRawValue();

    const request$ = this.isEditMode && this.productId
      ? this.adminProductService.updateProduct(this.productId, payload)
      : this.adminProductService.createAProduct(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = this.isEditMode
          ? 'Product updated successfully.'
          : 'Product created successfully.';
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  loadProduct(productId: number): void {
    this.adminProductService.getProductDetailById(productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          wholesalePrice: product.wholesalePrice,
          retailPrice: product.retailPrice,
          quantity: product.quantity
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Failed to load product #${productId} for admin`, error);
        this.errorMessage = `Failed to load product #${productId} for admin. Status: ${error.status || 'unknown'}`;
      }
    })
  }
}
